class ViewTakeViewController < ApplicationController
	def index
		@routes = Route.where(user_id: 1)
	end

	def show
		@route = Route.find(14)
		@points  = @route.points
	end 
end
