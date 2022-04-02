class CreateActiveLanguages < ActiveRecord::Migration[6.1]
  def change
    create_table :active_languages do |t|
      t.string :session
      t.string :language
      t.string :user_ip

      t.timestamps
    end
  end
end
