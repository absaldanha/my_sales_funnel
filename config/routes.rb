# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    resources :sales, only: %i[index create update] do
      scope module: :sales do
        resource :status, only: :update
      end
    end
  end
end
