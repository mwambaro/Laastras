class LaastrasCrmStrategiesController < ApplicationController
    before_action :init_parameters

    def index
        next_uri = nil 
        begin
            sql = "SELECT * FROM laastras_crm_strategies WHERE language = '#{I18n.locale.to_s}'"
            @crm_strategies = LaastrasCrmStrategy.find_by_sql sql
            if @crm_strategies.nil? || @crm_strategies.empty?
                raise 'We could not find any CRM strategy in the database'
            end
            
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
            sha256 = params[:strategy_id]
            if sha256.nil? || sha256.blank?
                raise 'Invalid, nil, or blank strategy id'
            end

            @crm_strategy = LaastrasCrmStrategy.find_by_sha256_and_language sha256, I18n.locale.to_s
            if @crm_strategy.nil? 
                raise 'We could not find the CRM strategy in the database'
            end
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
                request, 'Logo-e-laastras-ng.png'
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
