# frozen_string_literal: true

class AttemptPolicy
  attr_reader :user, :attempt

  def initialize(user, attempt)
    @user = user
  end

  def index?
    @user.role == "administrator"
  end
end
