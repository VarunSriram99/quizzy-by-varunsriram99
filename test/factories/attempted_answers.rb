# frozen_string_literal: true

FactoryBot.define do
  factory :attempted_answer do
    answer { Faker::Name.name }
  end
end
