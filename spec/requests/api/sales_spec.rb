# frozen_string_literal: true

RSpec.describe "Sales API" do
  describe "GET /api/sales" do
    it "responds with a 200 HTTP status" do
      get "/api/sales", headers: { "Content-Type" => "application/json" }

      expect(response).to have_http_status :ok
    end

    it "responds with the correct sales JSON" do
      get "/api/sales", headers: { "Content-Type" => "application/json" }

      expect(json_response).to match_json_schema(:sale_collection)
    end
  end

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

      it "creates a new sale log for the created sale" do
        post "/api/sales", params: correct_params, headers: { "Content-Type" => "application/json" }

        expect(Sale.first.logs.first).to have_attributes(status: "contact")
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

      it "doesn't log the sale creation" do
        post "/api/sales", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(SaleLog.count).to eq 0
      end
    end
  end

  describe "PATCH /api/sales/:id" do
    context "when updated successfully" do
      let(:correct_params) do
        Hash[sale: { status: "won" }].to_json
      end

      let!(:sale) { create(:sale, title: "Title", client_name: "Client", value: 100_00) }
      let!(:sale_log) { create(:sale_log, sale: sale, status: sale.status) }

      it "responds with a 200 HTTP status" do
        patch "/api/sales/#{sale.id}", params: correct_params,
          headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status :ok
      end

      it "responds with the correct sale JSON" do
        patch "/api/sales/#{sale.id}", params: correct_params,
          headers: { "Content-Type" => "application/json" }

        expect(json_response).to match_json_schema(:sale)
      end

      it "updates the sale record" do
        patch "/api/sales/#{sale.id}", params: correct_params,
          headers: { "Content-Type" => "application/json" }

        expect(Sale.first).to have_attributes(
          title: "Title", value: 100_00, status: "won", client_name: "Client"
        )
      end

      it "creates a new sale log" do
        patch "/api/sales/#{sale.id}", params: correct_params,
          headers: { "Content-Type" => "application/json" }

        expect(sale.logs.count).to eq 2
      end
    end

    context "when updated unsuccessfully" do
      let(:incorrect_params) do
        Hash[sale: { status: "contact" }].to_json
      end

      let!(:sale) { create(:sale, :won) }

      it "responds with a 422 HTTP status" do
        patch "/api/sales/#{sale.id}", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status :unprocessable_entity
      end

      it "responds with the correct error JSON" do
        patch "/api/sales/#{sale.id}", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(json_response).to match_json_schema(:sale_error)
      end

      it "doesn't update the sale record" do
        patch "/api/sales/#{sale.id}", params: incorrect_params,
          headers: { "Content-Type" => "application/json" }

        expect(Sale.first).to have_attributes(status: "won")
      end
    end
  end
end
