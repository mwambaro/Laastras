class LaastrasJobOffersController < ApplicationController
    before_action :init_parameters

    def index 
        next_uri = nil
        begin 
            language = I18n.locale.to_s
            sql_query = "SELECT * FROM laastras_job_offers WHERE language = '#{language}'"
            offers = LaastrasJobOffer.find_by_sql(sql_query)
        
            @all_job_offers = []
            applicants_label = I18n.t 'applicants_label'
            apply_label = I18n.t 'apply_label'
            @close_label = I18n.t 'close_label'

            offers.each do |job_offer|
                if ApplicationHelper.user_has_admin_role?(session)
                    @all_job_offers << {
                        job_offer_title: job_offer.title,
                        job_offer_description: job_offer.description,
                        apply_label: applicants_label,
                        job_offer_id: job_offer.id,
                        application_url: url_for(
                            controller: 'laastras_job_seekers',
                            action: 'index_jsk',
                            job_offer_id: job_offer.id
                        )
                    }
                else
                    @close_label = nil
                    @all_job_offers << {
                        job_offer_title: job_offer.title,
                        job_offer_description: job_offer.description,
                        apply_label: apply_label,
                        job_offer_id: job_offer.id,
                        application_url: url_for(
                            controller: 'laastras_job_offers', 
                            action: 'apply', 
                            id: job_offer.id
                        )
                    }
                end
            end

            if @all_job_offers.count == 0 
                session[:fail_safe_title] = I18n.t 'no_vacant_job_offers'
                session[:fail_safe_message] = I18n.t 'no_vacant_job_offers_message'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
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
            @job_offer = LaastrasJobOffer.find(params[:id])

            if @job_offer
                if ApplicationHelper.user_has_admin_role?(session)
                    @apply_label = (I18n.t 'applicants_label')
                    @close_label = (I18n.t 'close_label')
                    @application_url = url_for(
                        controller: 'laastras_job_seekers',
                        action: 'index_jsk',
                        job_offer_id: @job_offer.id
                    )
                else
                    @apply_label = (I18n.t 'apply_label')
                    @close_label = nil
                    @application_url = url_for(
                        controller: 'laastras_job_offers', 
                        action: 'apply', 
                        id: @job_offer.id
                    )
                end
                @close_job_url = url_for(
                    controller: 'laastras_job_offers', 
                    action: 'close', 
                    id: @job_offer.id
                )
            else 
                next_uri = url_for(
                    controller: 'maintenance', 
                    action: 'fail_safe'
                )
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

    def apply
        next_uri = nil 
        begin
            user = ApplicationHelper.who_is_logged_in?(session)
            if user 
                job_offer = LaastrasJobOffer.find(params[:id])
                if job_offer 
                    next_uri = url_for(
                        controller: 'laastras_job_seekers', 
                        action: 'fill_in_form',
                        job_offer_id: job_offer.id
                    )
                else
                    next_uri = url_for(
                        controller: 'maintenance', 
                        action: 'fail_safe'
                    )
                end
            else 
                next_uri = url_for(
                    controller: 'laastras', 
                    action: 'sign_in', 
                    redirect_uri: request.original_url
                )
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

    end # apply

    def close 
        next_uri = nil 
        begin
            id = params[:id]
            offer = LaastrasJobOffer.find(id)
            unless offer.nil?
                offer.destroy!
                session[:fail_safe_title] = I18n.t 'job_offer_successful_destruction'
                session[:fail_safe_message] = I18n.t 'job_offer_successful_destruction_message'
            else 
                session[:fail_safe_title] = I18n.t 'no_such_job_offer'
                session[:fail_safe_message] = I18n.t 'no_such_job_offer_message'
            end
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # close

    def init_parameters 
        next_uri = nil 
        begin
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

            @headerData = ApplicationHelper::SiteHeaderData.new(request, logger)
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
