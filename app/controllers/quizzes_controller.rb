# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[update show destroy]

  def index
    @quiz = Quiz.where(user_id: @current_user.id)
  end

  def create
    @quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    if @quiz.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  def update
    if @quiz.update!(quiz_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    render json: @quiz
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: t("successfully_destroyed", entity: "Quiz") }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: @quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:name, :user_id, :published, :id)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end
end
