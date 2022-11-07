class LaastrasCrmStrategiesController < ApplicationController
    before_action :init_parameters

    def index
        next_uri = nil 
        begin
            @crm_strategies = []
            @crm_strategies << {
                laastras_crm_title: (I18n.t 'homocracy_ransom_and_full_nda_issue_title'),
                laastras_crm_description: (I18n.t 'homocracy_ransom_and_full_nda_issue_message'),
                service_id: 'ransom-and-full-nda-issue',
                service_title_id: 'ransom-and-full-nda-issue-title'
            }
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # index

    def show
        next_uri = nil 
        begin
            @crm_strategy = {
                laastras_crm_title: (I18n.t 'homocracy_ransom_and_full_nda_issue_title'),
                laastras_crm_description: (I18n.t 'homocracy_ransom_and_full_nda_issue_message'),
                service_id: 'ransom-and-full-nda-issue',
                service_title_id: 'ransom-and-full-nda-issue-title'
            }
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # show

    def init_parameters 
        next_uri = nil 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.set_locale_from_request(request, logger, session)
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
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # init_parameters

end
