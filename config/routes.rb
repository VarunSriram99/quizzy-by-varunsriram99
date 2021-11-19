# frozen_string_literal: true

Rails.application.routes.draw do
  resource :sessions, only: %i[create destroy]
  resources :quizzes, only: %i[index create show update destroy]
  resources :options, only: :show, param: :question_id
  resources :questions, only: %i[create update destroy]
  resources :public_attempts, only: :show, param: :slug
  resources :users, only: :create
  resources :attempts, only: %i[update show index]
  resources :download_result, only: %i[index show]
  mount ActionCable.server, at: "/cable"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
