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

ActiveRecord::Schema.define(version: 2022_10_22_095403) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "laastras_documents", force: :cascade do |t|
    t.string "sha256"
    t.string "title"
    t.string "language"
    t.string "uri"
    t.string "mime_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "laastras_job_offers", force: :cascade do |t|
    t.string "title"
    t.string "sha256"
    t.text "description"
    t.boolean "featured"
    t.string "language"
    t.string "application_uri"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "laastras_job_seekers", force: :cascade do |t|
    t.integer "user_id"
    t.integer "job_offer_id"
    t.string "location"
    t.string "phone_number"
    t.string "cv_uri"
    t.string "cv_mime_type"
    t.string "cover_letter_uri"
    t.string "cover_letter_mime_type"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "laastras_marketing_videos", force: :cascade do |t|
    t.string "sha256"
    t.string "title"
    t.string "uri"
    t.string "mime_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "laastras_mature_videos", force: :cascade do |t|
    t.string "sha256"
    t.string "title"
    t.string "uri"
    t.string "mime_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "laastras_page_views", force: :cascade do |t|
    t.integer "user_id"
    t.string "request_url"
    t.string "session"
    t.string "ip_address"
    t.string "referer"
    t.string "user_agent"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "user_name"
    t.string "password"
    t.string "role"
    t.string "photo_uri"
    t.string "photo_mime_type"
    t.string "verify_email_token"
    t.datetime "last_login"
    t.datetime "last_logout"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
