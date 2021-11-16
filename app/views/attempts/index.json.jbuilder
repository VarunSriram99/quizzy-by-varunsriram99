# frozen_string_literal: true

json.attempts @attempts do |attempt|
  json.quiz_name Quiz.find_by(id: attempt.quiz_id).name
  @user = User.find_by(id: attempt.user_id)
  json.user_name "#{@user.first_name} #{@user.last_name}"
  json.email @user.email
  json.correct_answers attempt.correct_answers_count
  json.incorrect_answers attempt.incorrect_answers_count
end
