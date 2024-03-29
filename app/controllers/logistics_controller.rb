require 'json'
require 'core_ext/string'

class LogisticsController < ApplicationController
    before_action :init_parameters

    def shipment_service
    end

    def bus_service
    end

    def cab_service
    end

    def bike_service
    end

    def init_parameters
        I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
        ApplicationHelper.harvest_analytics(session, request)
        @site_title = "Laastras | #{params[:action]}"
        @laastras_banner_image = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @open_graph_proto_image_url = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @cache_store = Laastras::Application.config.action_controller.cache_store
        @home_label = I18n.t 'home_label'
        @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
        @work_in_progress_label = I18n.t 'work_in_progress_label'
        @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
        @work_in_progress_description = I18n.t 'work_in_progress_description'
        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
    end
end
