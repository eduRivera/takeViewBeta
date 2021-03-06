# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140905092526) do

  create_table "photos", force: true do |t|
    t.integer  "point_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "latlon"
  end

  add_index "photos", ["point_id"], name: "index_photos_on_point_id"

  create_table "points", force: true do |t|
    t.integer  "route_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "routes", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "tags"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

end
