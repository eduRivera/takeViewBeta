class CreatTakeViewController < ApplicationController
	def index 
		@latitude = EXIFR::JPEG.new(Rails.root.join('app/assets/images/IMG_0145.JPG').to_s).gps.latitude
		@longitude = EXIFR::JPEG.new(Rails.root.join('app/assets/images/IMG_0145.JPG').to_s).gps.longitude
	end
end
