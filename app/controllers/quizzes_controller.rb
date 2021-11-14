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
    if quiz_params[:published]
      create_slug
    end
    if @quiz.update!(quiz_params.except(:published))
      render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    @questions = @quiz.questions.all
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
      params.require(:quiz).permit(:name, :published, :id)
    end

    def load_quiz
      @quiz = Quiz.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def create_slug
      return unless @quiz[:slug].nil?

      name = @quiz[:name]
      name_slug = name.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_quiz_slug = Quiz.where(
        regex_pattern,
        "#{name_slug}$|#{name_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_quiz_slug.present?
        slug_count = latest_quiz_slug.split("-").last.to_i
        puts "slug_count", slug_count
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
      @quiz.update(slug: slug_candidate)
    end
end
