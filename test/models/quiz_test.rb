# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(
      first_name: "Sam", last_name: "Smith", email: "oliver@example.com", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = Quiz.new(name: "Quiz", user_id: @user.id)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_name_should_not_be_empty
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_equal ["Name can't be blank"], @quiz.errors.full_messages
  end

  def test_slug_should_be_generated_for_published_quizzes
    @quiz.update!(published: true)
    assert_equal @quiz.slug, "quiz"
  end

  def test_slug_should_not_be_generated_for_unpublished_quizzes
    @quiz.update!(published: false)
    assert_nil @quiz.slug
  end

  def test_quiz_should_not_exist_valid_user
    @quiz.user_id = nil
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end
end
