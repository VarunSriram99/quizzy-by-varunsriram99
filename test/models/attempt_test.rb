# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @attempt = build(:attempt, user_id: @user.id, quiz_id: @quiz.id)
  end

  def test_valid_attempt_should_be_saved
    assert @attempt.save!
  end

  def test_attempt_should_set_submitted_to_false_by_default
    assert @attempt.save!
    assert_equal false, @attempt.submitted
  end
end
