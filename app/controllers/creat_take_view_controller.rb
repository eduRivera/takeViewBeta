class CreatTakeViewController < ApplicationController

	def index 
	end

	def new 
		@latitude = EXIFR::JPEG.new(Rails.root.join('app/assets/images/IMG_0145.JPG').to_s).gps.latitude
		@longitude = EXIFR::JPEG.new(Rails.root.join('app/assets/images/IMG_0145.JPG').to_s).gps.longitude
		@points = Point.new 
	end

	def create
		@point = Point.new(params[:points])
		if @point.save
			  if params[:images]
       
          params[:images].each do |image|
            photo = @point.photos.create(image: image)

            photo_id = photo.id
            photo_id = photo_id.to_s
            photo_image_name = photo.image_file_name
            latitude = EXIFR::JPEG.new(Rails.root.join('public/images/'+photo_id+'/'+photo_image_name).to_s).gps.latitude
            longitude = EXIFR::JPEG.new(Rails.root.join('public/images/'+photo_id+'/'+photo_image_name).to_s).gps.longitude
           	
           	latlon = latitude.to_s+","+longitude.to_s
           	photo.update_attribute(:latlon, latlon)

           	point_id = photo.point_id
           	point = Point.find(point_id)
           	point.update_attribute(:user_id, 1) #since we dont have user
           	point.update_attribute(:route_id, 0)
           
          end
        end
			render :action =>'new_route'
		else
			render :action =>'new'
		end
	end
	
	def new_route

	end

	def create_route
		route = Route.new(name: params[:name], description: params[:description], tags: params[:tags])
		if route.save
		array_points = Point.where(user_id: 1, route_id: 0)
    array_points.each do |point|
      point.update(route_id: route.id)
    end

    render :action => 'index'
  	else
  		render :action => 'route'
  	end
	end

end
