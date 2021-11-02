# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: 0, administrator: 1 }
  validates :role, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: false },
format: { with: Constants::EMAIL_VALIDATION_REGEX }
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  before_create :convert_email_to_lowercase

  private

    def convert_email_to_lowercase
      self.email = self.email.downcase
    end
end
