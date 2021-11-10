# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

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

  private

    def json_parse_options
      parsed_options = JSON.parse params[:question_and_option][:options]
      question_params[:question_and_option][:options] = parsed_options
    end

    def question_params
      params.require(:question_and_option).permit(
        :question, :correct_option, :quiz_id,
        options: [:option, :option_number])
    end
end
