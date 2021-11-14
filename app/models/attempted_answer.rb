# frozen_string_literal: true

class AttemptedAnswer < ApplicationRecord
  belongs_to :attempt
  belongs_to :question
end
