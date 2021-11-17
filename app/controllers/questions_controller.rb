# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: %i[update destroy]

  def create
    @question = Question.new(question_params)
    authenticate @question
    if @question.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors.full_messages }
    end
  end

  def update
    authenticate @question
    @question.options.destroy_all
    if @question.update!(question_params)
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors.full_messages }
    end
  end

  def destroy
    authenticate @question
    quiz_id = @question.quiz_id
    if @question.destroy
      @quiz = Quiz.find_by(id: quiz_id)
      if @quiz.questions.count == 0
        unless @quiz.update!(slug: nil)
          render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
        end
      end
      render status: :ok, json: { notice: t("successfully_destroyed", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages }
    end
  end

  private

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end

    def question_params
      params.require(:question).permit(
        :question, :correct_option, :quiz_id,
        options_attributes: [:option, :option_number])
    end
end
