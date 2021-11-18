# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :create_or_update_user
  before_action :create_or_update_attempt

  def create
    render
  end

  private

    def create_or_update_user
      @user = User.find_by(email: user_params[:email].downcase)
      unless @user
        @user = @user = User.create!(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      end
    end

    def create_or_update_attempt
      @attempt = @user.attempts.find_by(quiz_id: params[:quiz_id])
      unless @attempt
        @attempt = @user.attempts.create!(quiz_id: params[:quiz_id])
      end
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
