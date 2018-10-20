# frozen_string_literal: true

module API
  class SalesController < ApplicationController
    def index
      sales = Sale.all
      render json: json_for(sales), status: :ok
    end

    def create
      sale = Sale.new(sale_params)

      if sale.save
        render json: json_for(sale), status: :created
      else
        render json: errors_for(sale), status: :unprocessable_entity
      end
    end

    def update
      sale = Sale.find(params[:id])

      if sale.update(sale_params)
        render json: json_for(sale), status: :ok
      else
        render json: errors_for(sale), status: :unprocessable_entity
      end
    end

    private

    def sale_params
      params.require(:sale).permit(:title, :client_name, :value)
    end

    def json_for(sale)
      sale.to_json(except: %i[created_at updated_at])
    end

    def errors_for(sale)
      { error: sale.errors.full_messages }.to_json
    end
  end
end
