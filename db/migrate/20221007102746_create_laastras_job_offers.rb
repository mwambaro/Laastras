class CreateLaastrasJobOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_job_offers do |t|
      t.string :title
      t.text :description
      t.string :application_uri

      t.timestamps
    end
  end
end
