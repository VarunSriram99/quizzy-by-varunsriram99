# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    @quiz = Quiz.where(user_id: @current_user.id)
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    if @quiz.save
      render status: :ok, json: { notice: "Successfully created quiz", entity: "Quiz" }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :user_id, :published)
    end
end
