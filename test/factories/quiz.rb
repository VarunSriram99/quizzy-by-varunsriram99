# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    name { Faker::Name.name }
    association :user
  end
end
