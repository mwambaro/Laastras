class ServicesController < ApplicationController
    before_action :init_parameters

    def all_services 
        @services = [
            {
                laastras_service_title: (I18n.t 'food_source_and_water_cooperative_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-grocery.svg'),
                laastras_service_description: (I18n.t 'food_source_and_water_cooperative_description'),
                service_id: 'e-grocery-service',
                service_title_id: 'e-grocery-service-ex'
            },
            {
                laastras_service_title: (I18n.t 'communication_as_a_service_cooperative_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-card.svg'),
                laastras_service_description: (I18n.t 'communication_as_a_service_cooperative_description'),
                service_id: 'e-card-service',
                service_title_id: 'e-card-service-ex'
            },
            {
                laastras_service_title: (I18n.t 'free_trade_capability_cooperative_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-logistics.svg'),
                laastras_service_description: (I18n.t 'free_trade_capability_cooperative_description'),
                service_id: 'e-logistics-service',
                service_title_id: 'e-logistics-service-ex'
            },
            {
                laastras_service_title: (I18n.t 'e_alliances_service_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-alliances.svg'),
                laastras_service_description: (I18n.t 'e_alliances_service_description'),
                service_id: 'e-alliances-service',
                service_title_id: 'e-alliances-service-ex'
            },
            {
                laastras_service_title: (I18n.t 'mythology_and_fiction_service_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-myths.svg'),
                laastras_service_description: (I18n.t 'mythology_and_fiction_service_description'),
                service_id: 'e-myth-service',
                service_title_id: 'e-myth-service-ex'
            },
            {
                laastras_service_title: (I18n.t 'morshux_phylosophy_service_title'),
                laastras_service_brand_image: ApplicationHelper.image_asset_url(request, 'Logo-e-morshux.svg'),
                laastras_service_description: (I18n.t 'morshux_phylosophy_service_description'),
                service_id: 'e-phylosophy-service',
                service_title_id: 'e-phylosophy-service-ex'
            }
        ]

    end # all_services

    def e_grocery
        next_uri = nil 
        begin
            @service_id = "e_grocery_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_grocery

    def e_card
        next_uri = nil 
        begin
            @service_id = "e_card_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_card

    def e_logistics
        next_uri = nil 
        begin
            @service_id = "e_logistics_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_logistics

    def e_alliances
        next_uri = nil 
        begin
            @service_id = "e_alliances_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_alliances

    def e_myth
        next_uri = nil 
        begin
            @service_id = "e_myth_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_myth

    def e_phylosophy
        next_uri = nil 
        begin
            @service_id = "e_morshux_service"
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # e_phylosophy

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
