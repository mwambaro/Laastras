require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Laastras
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    #=> I18n configs
    config.i18n.load_path += Dir[
      Rails.root.join('config', 'locales', '*.{rb,yml}'),
      Rails.root.join('config', 'locales', 'articles', '*.{rb,yml}'),
      Rails.root.join('config', 'locales', 'date_time_currency', '*.{rb,yml}'),
      Rails.root.join('config', 'locales', 'models', '*.{rb,yml}'),
      Rails.root.join('config', 'locales', 'views', '*.{rb,yml}')
    ]
    config.i18n.available_locales = [:en_US, :fr_FR] # add (:ru_BI, :lg_UG, :sw_TZ, :fr_FR) ASAP
    config.i18n.default_locale = :en_US
    #=> end I18n configs

    #=> X-Frame-Options
    config.action_dispatch.default_headers.merge!({'X-Frame-Options' => 'ALLOWALL'})
    #=> end X-Frame-Options

  end
end
