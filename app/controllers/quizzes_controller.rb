# frozen_string_literal: true

class QuizzesController < ApplicationController
  def index
    @quiz = Quiz.all
  end
end

private

def quiz_params
  params.require(:quiz).permit(:name, :user_id, :description, :published)
end
