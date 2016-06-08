class CreateBios < ActiveRecord::Migration
  def change
    create_table :bios do |t|
      t.string     :name
      t.text       :description
      t.text       :statement
      t.text       :info
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
