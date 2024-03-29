# frozen_string_literal: true

class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|
      t.boolean :submitted, null: false, default: false
      t.string :correct_answers_count
      t.string :incorrect_answers_count
      t.references :user, null: false, foreign_key: true
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
    add_index :attempts, [:user_id, :quiz_id], unique: true
  end
end
