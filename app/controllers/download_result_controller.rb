# frozen_string_literal: true

class DownloadResultController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def index
    ExcelDownloadJob.new.perform
    send_file(
      "#{Rails.root}/result.xls",
      filename: "result.xls",
      type: "application/vnd.ms-excel"
    )
  end
end
