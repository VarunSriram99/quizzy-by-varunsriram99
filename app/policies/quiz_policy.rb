# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
  end

  def index?
    @user.role == "administrator"
  end

  def create?
    index?
  end

  def update?
    index?
  end

  def destroy?
    index?
  end

  def show?
    index?
  end
end
