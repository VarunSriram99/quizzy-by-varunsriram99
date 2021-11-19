# frozen_string_literal: true

class AttemptPolicy
  attr_reader :user, :attempt

  def initialize(user, attempt)
    @user = user
    @attempt = attempt
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @user.role == "administrator" && scope.where(submitted: true)
    end
  end
end
