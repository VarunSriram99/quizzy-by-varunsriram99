# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question

  validates :option, presence: true
  validates :option_number, presence: true, inclusion: { in: 1..4, message: "%{value} is not between 1 & 4" }
end
