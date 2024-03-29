# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempted_answers, dependent: :destroy

  validates :question, presence: true
  validates_length_of :options, in: 2..4
  validates :correct_option, inclusion: { in: 1..4, message: "%{value} is not between 1 & 4" }
  accepts_nested_attributes_for :options
end
