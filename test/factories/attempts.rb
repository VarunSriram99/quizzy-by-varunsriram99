# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    submitted { false }
    association :user
    association :quiz
    correct_answers_count { 0 }
    incorrect_answers_count { 0 }
  end
end
