# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    option { Faker::Name.name }
    option_number { Faker::Number.between(from: 1, to: 4) }
    association :question, factory: :question
  end
end
