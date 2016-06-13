class CreatePurchases < ActiveRecord::Migration
  def change
    create_table :purchases do |t|
      t.string     :charge_id
      t.integer    :amount
      t.references :user
      t.references :artwork
      t.references :user,    index: true, foreign_key: true
      t.references :artwork, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
