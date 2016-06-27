class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string     :url
      t.string     :imageable_type
      t.integer    :imageable_id
      t.integer    :posX
      t.integer    :posY
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :images, :imageable_id
  end
end
