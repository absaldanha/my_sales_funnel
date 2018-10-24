# frozen_string_literal: true

RSpec.describe SaleLogListener do
  describe "#sale_modified" do
    let!(:sale) { create(:sale, :won) }

    subject(:listener) { SaleLogListener.new }

    it "creates a new sale log for the given sale" do
      listener.sale_status_changed(sale)

      log = SaleLog.first

      aggregate_failures do
        expect(log.sale.id).to eq sale.id
        expect(log.status).to eq sale.status
      end
    end
  end
end
