class CreateSaleLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :sale_logs do |t|
      t.references :sale, index: true, foreign_key: true
      t.string :status, null: false, index: true

      t.index [:status, :sale_id], unique: true

      t.timestamps null: false
    end
  end
end
