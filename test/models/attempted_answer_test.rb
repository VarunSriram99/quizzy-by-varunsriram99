# frozen_string_literal: true

require "test_helper"

class AttemptedAnswerTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @attempt = create(:attempt, user_id: @user.id, quiz_id: @quiz.id)
    @option1 = build(:option)
    @option2 = build(:option)
    @question = create(:question, quiz_id: @quiz.id, options: [@option1, @option2])
    @attempted_answer = build(:attempted_answer, attempt_id: @attempt.id, question_id: @question.id)
  end

  def test_valid_attempted_answer_should_be_submitted
    assert @attempted_answer.save!
  end

  def test_answer_should_be_present
    @attempted_answer.answer = nil
    assert_not @attempted_answer.save
    assert_equal ["Answer can't be blank"], @attempted_answer.errors.full_messages
  end
end
