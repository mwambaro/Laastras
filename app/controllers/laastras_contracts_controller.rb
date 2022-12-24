class LaastrasContractsController < ApplicationController
    before_action :init_parameters

    def index
        next_uri = nil 
        begin
            type = params[:type]
            if type.nil? || type.blank?
                sql = "SELECT * FROM laastras_contracts WHERE language = '#{I18n.locale.to_s}'"
                @contracts = LaastrasContract.find_by_sql sql
                if @contracts.nil? || @contracts.empty?
                    raise 'We could not find any contracts in the database'
                end
            else 
                if type.match? /\Aintimate-mate\Z/i
                    sql = "SELECT * FROM laastras_contracts WHERE language = '#{I18n.locale.to_s}' AND " +
                            "(sha256 = 'CC2900EFB2B91A92955B70021D56093965252A93043F17E5A7068A11500C3E0D' OR " + 
                            "sha256 = 'E9BE8321BE63CA2E2CB3630C67A13076B4B6A0A4E0D2A55A4D4E8100A0CFCE59')"
                    @contracts = LaastrasContract.find_by_sql sql
                    if @contracts.nil? || @contracts.empty?
                        raise 'We could not find any contracts in the database'
                    end
                end
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
            sha256 = params[:contract_id]
            if sha256.nil? || sha256.blank?
                raise 'Invalid, nil, or blank contract id'
            end

            @contract = LaastrasContract.find_by_sha256_and_language sha256, I18n.locale.to_s
            if @contract.nil? 
                raise 'We could not find the contract in the database'
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
