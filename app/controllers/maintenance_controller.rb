class MaintenanceController < ApplicationController
    before_action :init_parameters

    def fail_safe
        begin 
            unless session[:fail_safe_message].nil? 
                unless session[:fail_safe_message].blank?
                    @fail_safe_message = session[:fail_safe_message]
                    session[:fail_safe_message] = nil
                end 
            end
            if @fail_safe_message.nil? || @fail_safe_message.blank? 
                @fail_safe_message = (I18n.t 'fail_safe_message')
            end

            unless session[:fail_safe_title].nil? 
                unless session[:fail_safe_title].blank?
                    @fail_safe_title = session[:fail_safe_title]
                    session[:fail_safe_title] = nil
                end 
            end
            if @fail_safe_title.nil? || @fail_safe_title.blank?
                @fail_safe_title = (I18n.t 'fail_safe_title')
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

    end # fail_safe

    def init_parameters 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            @site_title = "Laastras | #{params[:action]}"
            @laastras_banner_image = ApplicationHelper.banner_image_asset_url(
                request
            )
            @open_graph_proto_image_url = ApplicationHelper.banner_image_asset_url(
                request
            )
            @logo_image_url = ApplicationHelper.image_asset_url(
                request, 'Logo-03.svg'
            )
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

    end # init_parameters
    
end
