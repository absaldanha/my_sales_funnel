# frozen_string_literal: true

RSpec.describe "Sales API" do
  describe "POST /api/sales" do
    context "when created successfully" do
      let(:correct_params) do
        Hash[sale: { title: "Sale title", client_name: "Foo", value: 100_00 }].to_json
      end

      it "responds with a 201 HTTP status" do
        post "/api/sales", params: correct_params, headers: { "Content-Type" => "application/json" }
        expect(response).to have_http_status :created
      end

      it "responds with the correct sale JSON" do
        post "/api/sales", params: correct_params, headers: { "Content-Type" => "application/json" }
        expect(json_response).to match_json_schema(:sale)
      end

      it "creates the Sale correctly" do
        post "/api/sales", params: correct_params, headers: { "Content-Type" => "application/json" }

        expect(Sale.first).to have_attributes(
          title: "Sale title", client_name: "Foo", value: 100_00, status: "contact"
        )
      end
    end

    context "when created unsuccessfully" do
      let(:incorrect_params) do
        Hash[sale: { value: -1, title: "Title" }].to_json
      end

      it "responds with a 422 HTTP status" do
        post "/api/sales", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status :unprocessable_entity
      end

      it "responds with the correct errors JSON" do
        post "/api/sales", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(json_response).to match_json_schema(:sale_error)
      end

      it "doesn't create a new sale record" do
        post "/api/sales", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(Sale.count).to eq 0
      end
    end
  end
end