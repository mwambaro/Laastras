class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :user_name
      t.string :password
      t.string :role
      t.string :device_id #=> ip@user_agent
      t.string :photo_uri 
      t.string :photo_mime_type
      t.string :verify_email_token
      t.datetime :last_login
      t.datetime :last_logout

      t.timestamps
    end
  end
end
