# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :attempts, dependent: :destroy
  has_many :questions, dependent: :destroy

  validates :name, presence: true
  validates_uniqueness_of :slug, allow_blank: true, allow_nil: true
end
