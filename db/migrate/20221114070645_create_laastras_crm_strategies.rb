class CreateLaastrasCrmStrategies < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_crm_strategies do |t|
      t.string :laastras_crm_title
      t.text :laastras_crm_description
      t.string :language
      t.string :sha256

      t.timestamps
    end
  end
end
