class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.string :subject
      t.text :object
      t.text :strategy
      t.string :assessment
      t.text :cclink
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
