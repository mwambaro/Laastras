class CreateLaastrasDocuments < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_documents do |t|
      t.string :sha256
      t.string :title
      t.string :language
      t.string :uri
      t.string :mime_type

      t.timestamps
    end
  end
end
