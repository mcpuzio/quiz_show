class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question
      t.string :multiple_choices
      t.string :solution

      t.timestamps null: false
    end
  end
end
