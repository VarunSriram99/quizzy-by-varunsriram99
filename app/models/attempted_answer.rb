# frozen_string_literal: true

class AttemptedAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question

  validates :answer, presence: true
end
