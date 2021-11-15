# frozen_string_literal: true

class AttemptsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    @attempt = Attempt.find_by(id: attempt_params[:attempt_id])
    unless @attempt.present?
      render status: :unauthorized, json: { error: t("not_found", entity: "Attempt") }
    else
      @attempt.attempted_answers = AttemptedAnswer.create(attempt_params[:answers])
      @attempt.submitted = true
      calculate_results
      if @attempt.save
        render status: :ok, json: { notice: t("successfully_submitted") }
      else
        errors = @attempt.errors.full_messages.to_sentence
        render status: :unprocessable_entity, json: { error: errors.full_messages }
      end
    end
  end

  private

    def attempt_params
      params.require(:submitted_answers).permit(:attempt_id, answers: [:question_id, :answer])
    end

    def calculate_results
      correct_answers = 0
      incorrect_answers = 0
      attempt_params[:answers].each do |answer|
        correct_answer = Question.find_by(id: answer[:question_id]).correct_option
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
