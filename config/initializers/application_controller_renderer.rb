# Be sure to restart your server when you modify this file.

# ActiveSupport::Reloader.to_prepare do
#   ApplicationController.renderer.defaults.merge!(
#     http_host: 'example.org',
#     https: false
#   )
# end

host = 'localhost:3000'
if Rails.env.match?(/\Aproduction\Z/i)
    host = 'laastras.herokuapp.com'
else 
    host = '192.168.43.149:3000'
end

ActiveSupport::Reloader.to_prepare do
    ApplicationController.renderer.defaults.merge!(
        http_host: host,
        https: true
    )
end
