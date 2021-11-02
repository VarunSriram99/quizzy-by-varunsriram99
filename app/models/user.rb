# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: 0, administrator: 1 }

  has_secure_password

  validates :role, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false },
format: { with: Constants::EMAIL_VALIDATION_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 7 }
  validates :password_confirmation, presence: true, on: :create
  before_save :convert_email_to_lowercase

  private

    def convert_email_to_lowercase
      email.downcase!
    end
end
