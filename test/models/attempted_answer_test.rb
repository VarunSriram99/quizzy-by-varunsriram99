# frozen_string_literal: true

require "test_helper"

class AttemptedAnswerTest < ActiveSupport::TestCase
  def setup
    @attempt = create(:attempt)
    @option1 = build(:option)
    @option2 = build(:option)
    @question = create(:question, options: [@option1, @option2])
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

  def test_valid_question_id_and_attempt_id_should_be_present
    attempted_answer2 = @attempted_answer.dup
    attempted_answer2.question_id = nil
    assert_not attempted_answer2.valid?
    assert_equal ["Question must exist"], attempted_answer2.errors.full_messages
    attempted_answer2 = @attempted_answer.dup
    attempted_answer2.attempt_id = nil
    assert_not attempted_answer2.valid?
    assert_equal ["Attempt must exist"], attempted_answer2.errors.full_messages
  end
end
