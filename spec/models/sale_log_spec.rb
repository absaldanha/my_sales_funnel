# frozen_string_literal: true

RSpec.describe SaleLog do
  describe "validations" do
    subject { create(:sale_log) }

    it { is_expected.to validate_uniqueness_of(:status).scoped_to(:sale_id) }
    it { is_expected.to validate_presence_of(:status) }
  end
end
