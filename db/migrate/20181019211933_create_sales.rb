class CreateSales < ActiveRecord::Migration[5.2]
  def up
    create_table :sales do |t|
      t.string :title, index: { unique: true }, null: false
      t.string :client_name, index: true, null: false
      t.integer :value, null: false
      t.string :status, null: false, default: "contact"

      t.timestamps null: false
    end

    execute <<-SQL
      ALTER TABLE sales
      ADD CONSTRAINT value_check check (value >= 0)
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE sales
      DROP CONSTRAINT value_check
    SQL

    drop_table :sales
  end
end
