# frozen_string_literal: true

class DownloadExcelWorker
  include Sidekiq::Worker
  queue_as :default

  def perform(*args)
    sleep(10)
    @attempts = Attempt.where(submitted: true)
    book = Spreadsheet::Workbook.new

    sheet = book.create_worksheet(name: "Results")
    sheet.row(0).push("Quiz Name", "User Name", "Email", "Correct Asswers", "Incorrect Answers")
    @attempts.each_with_index do |attempt, index|
      sheet.row(index + 1).push(
        attempt.quiz.name, "#{attempt.user.first_name} #{attempt.user.last_name}", attempt.user.email,
        attempt.correct_answers_count, attempt.incorrect_answers_count)
    end

    book.write "#{Rails.root}/result.xls"
    ActionCable.server.broadcast "notification_channel", "Excel complete"
  end
end
