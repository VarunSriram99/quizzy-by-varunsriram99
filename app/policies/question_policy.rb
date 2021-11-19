# frozen_string_literal: true

class QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
    @user = user
    @question = question
  end

  def create?
    @user.role == "administrator" && @question.quiz.user.id == @user.id
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
end
