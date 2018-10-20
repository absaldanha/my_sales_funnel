# frozen_string_literal: true

class SaleLog < ApplicationRecord
  belongs_to :sale

  validates :status, presence: true, uniqueness: { scope: :sale_id }
end
