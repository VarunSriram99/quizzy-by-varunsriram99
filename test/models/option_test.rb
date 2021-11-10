# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user_id: @user.id)
    @option = build(:option)
    @option2 = build(:option)
    @question = create(:question, quiz_id: @quiz.id, options: [@option, @option2])
  end

  def test_valid_options_should_be_accepted
    assert @option.save!
  end

  def test_option_should_have_valid_option_name
    @option.option = nil
    assert_not @option.save
    assert_equal ["Option can't be blank"], @option.errors.full_messages
  end

  def test_option_should_have_valid_option_number
    @option.option_number = nil
    assert_not @option.save
    assert_equal ["Option number can't be blank", "Option number #{@option.option_number} is not between 1 & 4"],
      @option.errors.full_messages
    @option.option_number = 0
    assert_not @option.save
    assert_equal ["Option number #{@option.option_number} is not between 1 & 4"], @option.errors.full_messages
    @option.option_number = 5
    assert_not @option.save
    assert_equal ["Option number #{@option.option_number} is not between 1 & 4"], @option.errors.full_messages
  end
end
