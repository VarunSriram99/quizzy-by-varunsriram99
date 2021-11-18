# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempted_answers, dependent: :destroy
  accepts_nested_attributes_for :attempted_answers
end
