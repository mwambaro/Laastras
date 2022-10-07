class MaintenanceController < ApplicationController
    before_action :init_parameters

    def fail_safe
    end

    def init_parameters 
        I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
        @site_title = "Laastras | #{params[:action]}"
        @laastras_banner_image = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @open_graph_proto_image_url = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @logo_image_url = ApplicationHelper.image_asset_url(
            request, 'Logo-03.svg'
        )
    end
    
end
