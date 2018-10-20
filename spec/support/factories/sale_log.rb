# frozen_string_literal: true

FactoryBot.define do
  factory :sale_log do
    sale
    status { "contact" }
  end
end
