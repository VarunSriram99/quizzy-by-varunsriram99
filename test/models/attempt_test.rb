# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @attempt = build(:attempt)
  end

  def test_valid_attempt_should_be_saved
    assert @attempt.save!
  end

  def test_attempt_should_set_submitted_to_false_by_default
    assert @attempt.save!
    assert_equal false, @attempt.submitted
  end

  def test_attempt_should_have_valid_quiz_id_and_user_id
    attempt2 = @attempt.dup
    attempt2.quiz_id = nil
    assert_not attempt2.valid?
    assert_equal ["User must exist", "Quiz must exist"], attempt2.errors.full_messages
    attempt2 = @attempt.dup
    attempt2.user_id = nil
    assert_not attempt2.valid?
    assert_equal ["User must exist", "Quiz must exist"], attempt2.errors.full_messages
  end
end
