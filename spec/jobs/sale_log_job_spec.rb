# frozen_string_literal: true

RSpec.describe SaleLogJob do
  describe "#perform" do
    subject(:job) { SaleLogJob.new }

    context "when a log for the given sale status already exists" do
      let!(:sale) { create(:sale) }

      before do
        create(:sale_log, sale: sale)
      end

      it "does nothing" do
        job.perform(sale.id, "contact", "2011-01-14 15:00:00 -0200")
        expect(SaleLog.count).to eq 1
      end
    end

    context "when a log for the given sale status doesn't exist" do
      let!(:sale) { create(:sale) }

      it "creates a new log for the new status" do
        job.perform(sale.id, "contact", "2011-01-14 15:00:00 -0200")

        aggregate_failures do
          expect(SaleLog.count).to eq 1
          expect(sale.logs.last).to have_attributes(sale_id: sale.id, status: sale.status)
        end
      end
    end
  end
end
