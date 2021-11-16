# frozen_string_literal: true

Rails.application.routes.draw do
  resource :sessions, only: %i[create destroy]
  resources :quizzes, only: %i[index create show update destroy], params: :id
  resources :options, only: :show, param: :question_id
  resources :questions, only: %i[create update destroy], param: :id
  resources :public_attempts, only: :show, param: :slug
  resources :users, only: :create
  resources :attempts, only: %i[create index]
  resources :results, only: :show, param: :id

  root "home#index"
  get "*path", to: "home#index", via: :all
end
