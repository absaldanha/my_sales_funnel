# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :sales, only: %i[index create update]
  end
end
