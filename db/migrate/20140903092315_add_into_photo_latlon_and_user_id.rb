class AddIntoPhotoLatlonAndUserId < ActiveRecord::Migration
  def change
  	add_column :photos, :latlon, :string
  end
end
