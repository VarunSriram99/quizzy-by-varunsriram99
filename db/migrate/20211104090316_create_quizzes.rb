# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.string :name, null: false
      t.string :description
      t.string :slug
      t.boolean :published, default: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
