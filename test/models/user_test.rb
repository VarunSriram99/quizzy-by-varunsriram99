# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam", last_name: "Smith", email: "sam@example.com", role: "standard",
      password: "password", password_confirmation: "password")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_email_should_be_present
    @user.email = ""
    assert_not @user.valid?
    assert_equal ["Email can't be blank", "Email is invalid"], @user.errors.full_messages
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert_not @user.valid?
    assert_equal ["First name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 51
    assert_not @user.valid?
    assert_equal ["Last name is too long (maximum is 50 characters)"], @user.errors.full_messages
  end

  def test_email_should_be_unique
    @user.save!
    user2 = @user.dup
    assert_not user2.valid?
    assert_equal ["Email has already been taken"], user2.errors.full_messages
  end

  def test_email_address_should_be_saved_as_lowercase
    @user.update!(email: "OLIVER@example.com")
    assert_equal @user.email, @user.email.downcase
  end

  def test_email_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
      @user.email = email
      assert @user.valid?
    end
  end

  def test_email_validation_should_not_accept_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.@sam-sam.com sam@sam+exam.com
fishy+#.com]
    invalid_emails.each do |email|
      @user.update(email: email)
      assert_not @user.valid?
      assert_equal ["Email is invalid"], @user.errors.full_messages
    end
  end

  def test_user_should_have_a_valid_role
    @user.role = nil
    assert_not @user.valid?
    assert_equal ["Role can't be blank"], @user.errors.full_messages
  end

  def test_user_should_accept_valid_role
    @user.update!(role: "administrator")
    assert @user.valid?
    @user.update!(role: "standard")
    assert @user.valid?
  end

  def test_password_can_not_be_blank
    @user.password = nil
    assert_not @user.valid?
    assert_equal ["Password can't be blank"], @user.errors.full_messages
  end

  def test_password_confirmation_can_not_be_blank
    @user.password_confirmation = nil
    assert_not @user.valid?
    assert_equal ["Password confirmation can't be blank"], @user.errors.full_messages
  end

  def test_password_should_have_minimum_length
    @user.password = "a" * 6
    @user.password_confirmation = "a" * 6
    assert_not @user.valid?
    assert_equal ["Password is too short (minimum is 7 characters)"], @user.errors.full_messages
  end

  def test_password_and_password_confirmation_should_match
    @user.password = "password1"
    @user.password_confirmation = "password2"
    assert_not @user.valid?
    assert_equal ["Password confirmation doesn't match Password"], @user.errors.full_messages
  end
end
