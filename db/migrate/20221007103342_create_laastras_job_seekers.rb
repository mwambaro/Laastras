class CreateLaastrasJobSeekers < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_job_seekers do |t|
      t.integer :user_id
      t.string :location
      t.string :phone_number
      t.string :cv_uri
      t.string :cover_letter_uri

      t.timestamps
    end
  end
end
