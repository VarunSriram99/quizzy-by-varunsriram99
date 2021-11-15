# frozen_string_literal: true

json.quizzes do
  json.extract! @quiz,
    :name,
    :id,
    :slug

  if @user.nil?
    json.questions @questions do |question|
      json.extract! question, :id, :question
      json.options question.options
    end
  else
    if @attempt.submitted
      json.questions @questions do |question|
        json.extract! question, :id, :question, :correct_option
        json.options question.options
      end
    end
  end
end
