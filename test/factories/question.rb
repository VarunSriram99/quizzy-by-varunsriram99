# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    question { Faker::Name.name }
    correct_option { Faker::Number.between(from: 1, to: 4) }
  end
end
