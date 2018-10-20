# frozen_string_literal: true

class Sale < ApplicationRecord
  validates :title, :client_name, :value, presence: true
  validates :title, uniqueness: true
  validates :value, numericality: { greater_than_or_equal_to: 0 }
  validates :status, status: true

  has_many :logs, class_name: "SaleLog"

  enum status: {
    contact: "contact",
    proposal_submission: "proposal_submission",
    follow_up: "follow_up",
    closing: "closing",
    won: "won",
    lost: "lost"
  }
end
