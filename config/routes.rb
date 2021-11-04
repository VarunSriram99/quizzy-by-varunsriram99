# frozen_string_literal: true

Rails.application.routes.draw do
  resource :sessions, only: %i[create destroy]
  resources :quizzes, only: %i[index]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
