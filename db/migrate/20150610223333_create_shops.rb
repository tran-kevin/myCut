class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.integer :moderator_id, null: false
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zip, null: false
      t.integer :phone, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.float :rating, default: 0, null: false
      t.attachment :store_picture

      t.timestamps
    end
    add_index :shops, :moderator_id
  end
end
