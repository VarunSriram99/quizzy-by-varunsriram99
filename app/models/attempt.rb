# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :user
  belongs_to :quiz
  has_many :attempted_answers, dependent: :destroy
end
