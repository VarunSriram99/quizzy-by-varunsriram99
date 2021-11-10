# frozen_string_literal: true

class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :option, null: false
      t.integer :option_number, null: false
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
