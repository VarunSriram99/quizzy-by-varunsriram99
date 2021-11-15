# frozen_string_literal: true

class CreateAttemptedAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :attempted_answers do |t|
      t.integer :answer, null: false
      t.references :question, null: false, foreign_key: true
      t.references :attempt, null: false, foreign_key: true
      t.timestamps
    end
    add_index :attempted_answers, [:attempt_id, :question_id], unique: true
  end
end
