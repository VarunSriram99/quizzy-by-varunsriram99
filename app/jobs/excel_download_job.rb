# frozen_string_literal: true

class ExcelDownloadJob < ApplicationJob
  before_perform :begun_file_creation
  after_perform :created_file

  queue_as :default

  def perform
    sleep(10)
    @attempts = Attempt.where(submitted: true)
    book = Spreadsheet::Workbook.new

    sheet = book.create_worksheet(name: "Results")
    sheet.row(0).push("Quiz Name", "User Name", "Email", "Correct Asswers", "Incorrect Answers")
    @attempts.each_with_index do |attempt, index|
      @quiz = Quiz.find(attempt.quiz_id)
      @user = User.find(attempt.user_id)
      sheet.row(index + 1).push(
        @quiz.name, "#{@user.first_name} #{@user.last_name}", @user.email,
        attempt.correct_answers_count, attempt.incorrect_answers_count)
    end

    book.write "result.xls"
  end

  def begun_file_creation
    puts "File creation has begun"
  end

  def created_file
    puts "File creation has ended"
  end
end
