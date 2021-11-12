# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: %i[update destroy]

  def create
    @question = Question.new(question_params.except(:options))
    @question.options = Option.create(question_params[:options])
    if @question.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors.full_messages }
    end
  end

  def update
    @question.assign_attributes(question_params.except(:options))
    @question.options.destroy_all
    @question.options = Option.create(question_params[:options])
    if @question.save!
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = @question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
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
      params.require(:question_and_option).permit(
        :question, :correct_option, :quiz_id,
        options: [:option, :option_number])
    end
end