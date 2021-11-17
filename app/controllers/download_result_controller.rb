# frozen_string_literal: true

class DownloadResultController < ApplicationController
  def index
    ExcelDownloadJob.new.perform
    send_file(
      "#{Rails.root}/result.xls",
      filename: "result.xls",
      type: "application/vnd.ms-excel"
    )
  end
end
