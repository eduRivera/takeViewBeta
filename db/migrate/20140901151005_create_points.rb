class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
    	t.integer :route_id
      t.timestamps
    end
  end
end
