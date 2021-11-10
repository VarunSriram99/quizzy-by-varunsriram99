# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.name }
    last_name { Faker::Name.name }
    email { Faker::Internet.email }
    role { "standard" }
    password { "welcome" }
    password_confirmation { "welcome" }
  end
end
