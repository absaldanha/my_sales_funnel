# frozen_string_literal: true

class SaleLogListener
  def sale_status_changed(sale)
    SaleLog.create(sale: sale, status: sale.status)
  end
end
