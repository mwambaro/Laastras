class CreateLaastrasMatureVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :laastras_mature_videos do |t|
      t.string :sha256
      t.string :title
      t.string :uri
      t.string :mime_type

      t.timestamps
    end
  end
end
