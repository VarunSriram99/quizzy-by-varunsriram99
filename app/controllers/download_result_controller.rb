# frozen_string_literal: true

class DownloadResultController < ApplicationController
  before_action :authenticate_user_using_x_auth_token

  def request_file
    @attempts = policy_scope(Attempt)
    if @attempts
      DownloadExcelWorker.perform_async()
      render status: :ok, json: { message: "Download Requested" }
    end
  end

  def download_file
    send_file(
      "#{Rails.root}/result.xls",
      filename: "result.xls",
      type: "application/vnd.ms-excel"
    )
  end
end
