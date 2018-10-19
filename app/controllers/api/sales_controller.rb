# frozen_string_literal: true

module API
  class SalesController < ApplicationController
    def create
      sale = Sale.new(creation_params)

      if sale.save
        sale.save
        render json: sale.to_json(except: %i[id created_at updated_at]), status: :created
      else
        render json: { error: sale.errors.full_messages }.to_json, status: :unprocessable_entity
      end
    end

    private

    def creation_params
      params.require(:sale).permit(:title, :client_name, :value)
    end
  end
end
