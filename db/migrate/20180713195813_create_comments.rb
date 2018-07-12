class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.references :post
      t.references :user
      t.text :description
      t.integer :parent_id
      t.timestamps
    end
  end
end
