# frozen_string_literal: true

class PublicAttemptsController < ApplicationController
  before_action :load_attempt_quiz, only: :show

  def show
    @user = User.find_by(email: params[:email])
    @questions = @quiz.questions.all
  end

  private

    def load_attempt_quiz
      @quiz = Quiz.find_by(slug: params[:slug])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end
end
