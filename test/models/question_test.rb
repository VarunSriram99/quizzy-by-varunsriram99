# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @option1 = build(:option)
    @option2 = build(:option)
    @question = build(:question, quiz_id: @quiz.id, options: [@option1, @option2])
  end

  def test_valid_question_should_be_accepted
    assert @question.save!
  end

  def test_question_should_have_atleast_two_options
    @question.options = [@option1]
    assert_not @question.valid?
    assert_equal ["Options is too short (minimum is 2 characters)"], @question.errors.full_messages
  end

  def test_question_should_have_atmost_four_options
    @option3 = build(:option)
    @option4 = build(:option)
    @option5 = build(:option)
    @question.options = [@option1, @option2, @option3, @option4, @option5]
    assert_not @question.valid?
    assert_equal ["Options is too long (maximum is 4 characters)"], @question.errors.full_messages
  end

  def test_question_should_have_valid_question
    @question.question = nil
    assert_not @question.valid?
    assert_equal ["Question can't be blank"], @question.errors.full_messages
  end

  def test_correct_option_should_be_between_one_and_four
    @question.correct_option = 0
    assert_not @question.valid?
    assert_equal ["Correct option #{@question.correct_option} is not between 1 & 4"], @question.errors.full_messages
    @question.correct_option = 5
    assert_not @question.valid?
    assert_equal ["Correct option #{@question.correct_option} is not between 1 & 4"], @question.errors.full_messages
  end
end
