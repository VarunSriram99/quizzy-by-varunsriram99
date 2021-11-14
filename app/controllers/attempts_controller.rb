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
      if @attempt.save
        render status: :ok, json: { notice: t("successfully_submitted") }
      end
    end
  end

  private

    def attempt_params
      params.require(:submitted_answers).permit(:attempt_id, answers: [:question_id, :answer])
    end
end
