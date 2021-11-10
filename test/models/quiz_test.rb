# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = build(:quiz, user_id: @user.id)
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_name_should_not_be_empty
    @quiz.name = ""
    assert_not @quiz.valid?
    assert_equal ["Name can't be blank"], @quiz.errors.full_messages
  end

  def test_quiz_should_should_have_a_valid_user
    @quiz.user_id = nil
    assert_not @quiz.valid?
    assert_equal ["User must exist"], @quiz.errors.full_messages
  end

  def test_slug_should_be_unique
    quiz2 = build(:quiz, user_id: @user.id)
    @quiz.slug = "sample_quiz"
    @quiz.save
    quiz2.slug = "sample_quiz"
    assert_not quiz2.valid?
    assert_equal ["Slug has already been taken"], quiz2.errors.full_messages
  end
end
