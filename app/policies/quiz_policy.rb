# frozen_string_literal: true

class QuizPolicy
  attr_reader :user, :quiz

  def initialize(user, quiz)
    @user = user
    @quiz = quiz
  end

  def create?
    @user.role == "administrator" && @quiz.user_id = @user.id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def show?
    create?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @user.role == "administrator" && scope.where(user_id: user.id)
    end
  end
end
