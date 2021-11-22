# frozen_string_literal: true

class DownloadExcelWorker
  include Sidekiq::Worker
  queue_as :default

  def perform(*args)
    ActionCable.server.broadcast "notification_channel", "Fetching table data"
    @attempts = Attempt.where(submitted: true)
    sleep(2)
    ActionCable.server.broadcast "notification_channel", "Creating file"
    book = Spreadsheet::Workbook.new
    sleep(2)
    ActionCable.server.broadcast "notification_channel", "Populating data"
    sheet = book.create_worksheet(name: "Results")
    sheet.row(0).push("Quiz Name", "User Name", "Email", "Correct Asswers", "Incorrect Answers")
    @attempts.each_with_index do |attempt, index|
      sheet.row(index + 1).push(
        attempt.quiz.name, "#{attempt.user.first_name} #{attempt.user.last_name}", attempt.user.email,
        attempt.correct_answers_count, attempt.incorrect_answers_count)
    end
    sleep(2)

    ActionCable.server.broadcast "notification_channel", "Saving updated file"
    book.write "result.xls"
    sleep(2)
    ActionCable.server.broadcast "notification_channel", "Fetching results"
    sleep(2)
    ActionCable.server.broadcast "notification_channel", "Excel complete"
  end
end
