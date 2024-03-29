# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_13_111915) do

  create_table "attempted_answers", force: :cascade do |t|
    t.integer "answer", null: false
    t.integer "question_id", null: false
    t.integer "attempt_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attempt_id", "question_id"], name: "index_attempted_answers_on_attempt_id_and_question_id", unique: true
    t.index ["attempt_id"], name: "index_attempted_answers_on_attempt_id"
    t.index ["question_id"], name: "index_attempted_answers_on_question_id"
  end

  create_table "attempts", force: :cascade do |t|
    t.boolean "submitted", default: false, null: false
    t.string "correct_answers_count"
    t.string "incorrect_answers_count"
    t.integer "user_id", null: false
    t.integer "quiz_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_id"], name: "index_attempts_on_quiz_id"
    t.index ["user_id", "quiz_id"], name: "index_attempts_on_user_id_and_quiz_id", unique: true
    t.index ["user_id"], name: "index_attempts_on_user_id"
  end

  create_table "options", force: :cascade do |t|
    t.string "option", null: false
    t.integer "option_number", null: false
    t.integer "question_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_options_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "question", null: false
    t.integer "correct_option", null: false
    t.integer "quiz_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["slug"], name: "index_quizzes_on_slug", unique: true
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", default: 0, null: false
    t.string "password_digest", null: false
    t.string "authentication_token"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "attempted_answers", "attempts"
  add_foreign_key "attempted_answers", "questions"
  add_foreign_key "attempts", "quizzes"
  add_foreign_key "attempts", "users"
  add_foreign_key "options", "questions"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quizzes", "users"
end
