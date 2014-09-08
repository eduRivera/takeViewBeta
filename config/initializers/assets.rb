# Be sure to restart your server when you modify this file.
Rails.application.config.assets.precompile += %w( creat_take_view/index.js )
Rails.application.config.assets.precompile += %w( creat_take_view.css )
Rails.application.config.assets.precompile += %w( js/bootstrap.js )
Rails.application.config.assets.precompile += %w( view_take_view/jssor.core.js )
Rails.application.config.assets.precompile += %w( view_take_view/jssor.slider.js )
Rails.application.config.assets.precompile += %w( view_take_view/jssor.utils.js )
Rails.application.config.assets.precompile += %w( view_take_view/show.js )
Rails.application.config.assets.precompile += %w( view_take_view/maps.js )
Rails.application.config.assets.precompile += %w( creat_take_view/route.js )
# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
