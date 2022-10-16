class MoneyTransferController < ApplicationController
    before_action :init_parameters
    
    def payment_method
    end

    def payment_information
    end

    def receive_payment_information
    end

    def payment_review
    end

    def payment_confirmation
    end

    def donate 
        next_uri = nil 
        begin 
            donate_options
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # donate

    def init_parameters 
        next_uri = nil 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.harvest_analytics(session, request)
            @site_title = "Laastras | #{params[:action]}"
            @laastras_banner_image = ApplicationHelper.image_asset_url(
                request, 'Laastras-e-banner-lg.JPG'
            )
            @open_graph_proto_image_url = ApplicationHelper.image_asset_url(
                request, 'Laastras-e-banner-lg.JPG'
            )
            @action_name = params[:action].nil? ? '' : params[:action]
            @money_transfer_options = [
                'Western Union',
                'PayPal',
                'Payoneer',
                'Stripe'
            ]
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

    def donate_options 
        next_uri = nil
        begin 
            @money_transfer_options = [
                {
                    money_transfer_option_title: (I18n.t 'western_union_option'),
                    money_transfer_option_description: (I18n.t 'western_union_option_description'),
                    option_id: 'wu-12',
                    option_id_title: 'wu-12-t'
                },
                {
                    money_transfer_option_title: (I18n.t 'mobile_wallet_option'),
                    money_transfer_option_description: (I18n.t 'mobile_wallet_option_description'),
                    option_id: "wremit-12",
                    option_id_title: "wremit-12-t"
                },
                {
                    money_transfer_option_title: (I18n.t 'laastras_services_consumer_option'),
                    money_transfer_option_description: (I18n.t 'laastras_services_consumer_option_description'),
                    option_id: "services-consumption-12",
                    option_id_title: "services-consuption-12-t"
                }
            ]
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # donate_options
end
