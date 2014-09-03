class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
    	t.string :name
    	t.string :description
    	t.string :tags
      t.timestamps
    end
  end
end
