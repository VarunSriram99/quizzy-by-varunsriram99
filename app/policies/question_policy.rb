# frozen_string_literal: true

class QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
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
