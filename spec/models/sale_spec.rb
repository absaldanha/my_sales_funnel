# frozen_string_literal: true

RSpec.describe Sale do
  describe "validations" do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:client_name) }
    it { is_expected.to validate_presence_of(:value) }
    it { is_expected.to validate_numericality_of(:value).is_greater_than_or_equal_to(0) }

    it "should validate status changes" do
      valid_sale = create(:sale, :follow_up)
      valid_sale.status = "won"

      invalid_sale = create(:sale, :won)
      invalid_sale.status = "follow_up"

      aggregate_failures do
        expect(valid_sale).to be_valid
        expect(invalid_sale).to be_invalid
      end
    end
  end
end
