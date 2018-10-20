# frozen_string_literal: true

RSpec.describe SaleLogListener do
  describe "#sale_modified" do
    subject(:listener) { SaleLogListener.new }

    before do
      Timecop.freeze(Time.local(2011, 1, 14, 15, 0, 0))
    end

    after do
      Timecop.return
    end

    it "enqueues a SaleLogJob" do
      sale = Sale.new(id: 1, status: "won")

      listener.sale_modified(sale)
      expect(SaleLogJob).to have_been_enqueued.with(1, "won", "2011-01-14 15:00:00 -0200")
    end
  end
end
