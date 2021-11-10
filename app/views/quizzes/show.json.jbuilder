# frozen_string_literal: true

json.quizzes do
  json.extract! @quiz,
    :name,
    :id

  json.questions @questions do |question|
    json.extract! question, :id, :question, :correct_option
    json.options question.options
  end
end
