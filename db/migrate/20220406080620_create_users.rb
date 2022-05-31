class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :first_name
      t.string :last_name
      t.string :user_name
      t.string :password
      t.string :role
      t.datetime :last_login
      t.datetime :last_logout
      t.binary :photo

      t.timestamps
    end
  end
end
