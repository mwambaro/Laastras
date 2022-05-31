class CreateLaastrasPageViews < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_page_views do |t|
      t.integer :user_id
      t.string :request_url
      t.string :session
      t.string :ip_address
      t.string :referer
      t.string :user_agent

      t.timestamps
    end
  end
end
