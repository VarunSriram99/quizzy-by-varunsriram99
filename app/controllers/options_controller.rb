# frozen_string_literal: true

class OptionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_option

  def show
    render
  end

  private

    def load_option
      @options = Option.where(question_id: params[:question_id])
      unless @options
        render status: :not_found, json: { error: t("not_found", entity: "Option") }
      end
    end
end
