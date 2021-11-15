# frozen_string_literal: true

json.results do
  json.extract! @attempt, :submitted, :correct_answers_count, :incorrect_answers_count
  json.attempted_answers @attempt.attempted_answers.all
end
