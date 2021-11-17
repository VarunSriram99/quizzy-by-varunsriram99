# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    @user = User.find_by(email: user_params[:email].downcase)
    if @user
      @attempt = @user.attempts.find_by(quiz_id: params[:quiz_id])
      unless @attempt
        @attempt = Attempt.create!(user_id: @user.id, quiz_id: Quiz.find_by(slug: params[:slug]).id)
        render
      end
    else
      @user = User.create!(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      @attempt = Attempt.create!(user_id: @user.id, quiz_id: Quiz.find_by(slug: params[:slug]).id)
    end
  end

  private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end
end
