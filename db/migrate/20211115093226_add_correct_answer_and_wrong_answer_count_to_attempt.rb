# frozen_string_literal: true

class AddCorrectAnswerAndWrongAnswerCountToAttempt < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :correct_answers_count, :string
    add_column :attempts, :incorrect_answers_count, :string
  end
end
