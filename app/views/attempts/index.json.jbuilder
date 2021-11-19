# frozen_string_literal: true

json.attempts @attempts do |attempt|
  json.quiz_name attempt.quiz.name
  json.user_name "#{attempt.user.first_name} #{attempt.user.last_name}"
  json.email attempt.user.email
  json.correct_answers attempt.correct_answers_count
  json.incorrect_answers attempt.incorrect_answers_count
end
