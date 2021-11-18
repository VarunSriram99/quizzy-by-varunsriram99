# frozen_string_literal: true

class AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_attempt, only: %i[show update]
  before_action :calculate_results, only: :update

  def index
    @attempts = Attempt.where(submitted: true)
    authorize @attempts
  end

  def show
    render
  end

  def update
    @attempt.update!(attempt_params)
    @attempt.submitted = true
    if @attempt.save
      render status: :ok, json: { notice: t("successfully_submitted") }
    else
      errors = @attempt.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors.full_messages }
    end
  end

  private

    def attempt_params
      params.require(:submitted_answers).permit(attempted_answers_attributes: [:question_id, :answer])
    end

    def load_attempt
      @attempt = Attempt.find_by(id: params[:id])
      unless @attempt.present?
        render status: :unauthorized, json: { error: t("not_found", entity: "Attempt") }
      end
    end

    def calculate_results
      correct_answers = 0
      incorrect_answers = 0
      @questions = Question.all
      attempt_params[:attempted_answers_attributes].each do |answer|
        correct_answer = @questions.find_by(id: answer[:question_id]).correct_option
        if correct_answer.to_i == answer[:answer].to_i
          correct_answers = correct_answers + 1
        else
          incorrect_answers = incorrect_answers + 1
        end
      end
      @attempt.correct_answers_count = correct_answers
      @attempt.incorrect_answers_count = incorrect_answers
    end
end
