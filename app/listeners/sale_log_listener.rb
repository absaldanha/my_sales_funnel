# frozen_string_literal: true

class SaleLogListener
  def sale_modified(sale)
    SaleLogJob.perform_later(sale.id, sale.status, Time.zone.now.to_s)
  end
end
