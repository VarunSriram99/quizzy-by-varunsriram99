# frozen_string_literal: true

json.extract! @quiz,
  :name,
  :id,
  :slug

json.questions @questions do |question|
  json.extract! question, :id, :question, :correct_option
  json.options question.options
end
