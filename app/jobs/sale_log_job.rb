# frozen_string_literal: true

class SaleLogJob < ApplicationJob
  def perform(sale_id, status, time)
    log = SaleLog.find_or_initialize_by(sale_id: sale_id, status: status)

    return if log.persisted?

    datetime = time.to_datetime
    log.update(created_at: datetime, updated_at: datetime)
  end
end
