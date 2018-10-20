# frozen_string_literal: true

FactoryBot.define do
  factory :sale do
    title { Faker::Lorem.sentence(3) }
    client_name { Faker::Company.name }
    value { Faker::Number.number(7) }
    status { "contact" }
  end
end
