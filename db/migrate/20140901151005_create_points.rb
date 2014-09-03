class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
    	t.string :latlon
    	t.integer :route_id
      t.timestamps
    end
  end
end
