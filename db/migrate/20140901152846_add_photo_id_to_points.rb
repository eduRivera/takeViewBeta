class AddPhotoIdToPoints < ActiveRecord::Migration
  def change
  	add_column :points, :photos_id, :integer
  end
end
