class ViewTakeViewController < ApplicationController
	def index
		@routes = Route.where(user_id: 1)
	end

	def show
		array_lat_lon = Array.new    
		@route = Route.find(14)
		@points  = @route.points
		@points.each do |points|
			points.photos.each do |photo|
				array_lat_lon.push(photo.latlon) 
			end
		end
		
		respond_to do |format|

	    	format.html 
	    	format.json { render json: array_lat_lon }
	    end
		 
	end 
end
