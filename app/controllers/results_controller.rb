# frozen_string_literal: true

class ResultsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @attempt = Attempt.find_by(id: params[:id])
    if @attempt.present?
      render
    else
      render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
    end
  end
end
