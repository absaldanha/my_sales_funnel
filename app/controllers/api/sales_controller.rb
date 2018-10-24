# frozen_string_literal: true

module API
  class SalesController < API::ApplicationController
    include Wisper::Publisher

    def index
      sales = Sale.all
      render json: json_for(sales), status: :ok
    end

    def create
      sale = Sale.new(create_params)

      if sale.save
        publish(:sale_status_changed, sale)
        render json: json_for(sale), status: :created
      else
        render json: errors_for(sale), status: :unprocessable_entity
      end
    end

    def update
      sale = Sale.find(params[:id])

      if sale.update(update_params)
        publish(:sale_status_changed, sale)
        render json: json_for(sale), status: :ok
      else
        render json: errors_for(sale), status: :unprocessable_entity
      end
    end

    private

    def create_params
      params.require(:sale).permit(:title, :client_name, :value)
    end

    def update_params
      params.require(:sale).permit(:status)
    end

    def json_for(sale)
      sale.to_json(except: %i[created_at updated_at])
    end

    def errors_for(sale)
      { error: sale.errors.full_messages }.to_json
    end
  end
end
