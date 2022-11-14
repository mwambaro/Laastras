class CreateLaastrasContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_contracts do |t|
      t.string :title
      t.text :description
      t.string :language
      t.string :sha256

      t.timestamps
    end
  end
end
