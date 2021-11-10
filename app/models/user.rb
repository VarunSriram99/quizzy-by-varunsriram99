# frozen_string_literal: true

class User < ApplicationRecord
  EMAIL_VALIDATION_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  has_many :quizzes

  enum role: { standard: 0, administrator: 1 }, _default: "standard"

  validates :role, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_VALIDATION_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :password, presence: true, length: { minimum: 7 }
  validates :password_confirmation, presence: true, on: :create
  before_validation :convert_email_to_lowercase

  has_secure_password
  has_secure_token :authentication_token

  private

    def convert_email_to_lowercase
      email.downcase!
    end
end
