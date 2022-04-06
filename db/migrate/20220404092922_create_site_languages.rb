class CreateSiteLanguages < ActiveRecord::Migration[6.1]
  def change
    create_table :site_languages do |t|
      t.string :language
      t.string :user_session
      t.string :user_ip
      t.string :user_browser

      t.timestamps
    end
  end
end
