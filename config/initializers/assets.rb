# Be sure to restart your server when you modify this file.
Rails.application.config.assets.precompile += %w( creat_take_view/index.js )
Rails.application.config.assets.precompile += %w( creat_take_view.css )
Rails.application.config.assets.precompile += %w( js/bootstrap.js )
# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
