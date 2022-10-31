class CreateLaastrasJobOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_job_offers do |t|
      t.string :title
      t.string :sha256
      t.text :description
      t.boolean :featured
      t.boolean :archived
      t.string :language
      t.string :application_uri

      t.timestamps
    end
  end
end
