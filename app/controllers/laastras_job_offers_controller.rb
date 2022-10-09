class LaastrasJobOffersController < ApplicationController
    before_action :init_parameters, :seed 

    def index 
        language = I18n.locale.to_s
        sql_query = "SELECT * FROM laastras_job_offers WHERE language = '#{language}'"
        @all_job_offers = LaastrasJobOffer.find_by_sql(sql_query)

    end # index

    def show 
        @job_offer = LaastrasJobOffer.find(params[:id])
        next_url = nil

        if @job_offer
        else 
            next_url = url_for(
                controller: 'maintenance', 
                action: 'fail_safe'
            )
        end

        if next_url
            redirect_to next_url
        end

    end # show

    def apply
        user = ApplicationHelper.who_is_logged_in?(session)
        next_url = nil
        if user 
            job_offer = LaastrasJobOffer.find(params[:id])
            if job_offer 
                next_url = url_for(
                    controller: 'laastras_job_seekers', 
                    action: 'fill_in_form'
                )
            else
                next_url = url_for(
                    controller: 'maintenance', 
                    action: 'fail_safe'
                )
            end
        else 
            next_url = url_for(
                controller: 'laastras', 
                action: 'sign_in', 
                redirect_uri: request.original_url
            )
        end

        redirect_to next_url

    end # apply

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

    end # init_parameters

    def seed 
        # Have we seeded the database ?
        # We assume all went well first time we seeded.
        # Please, restart seeding from scratch if you add more job offers
        title = (I18n.t 'project_manager_assistant')
        sql_query = "SELECT * FROM laastras_job_offers WHERE title = '#{title}'"
        count = LaastrasJobOffer.find_by_sql(sql_query).count
        if count > 0 
            logger.debug '---> No need to seed laastras_job_offers database table. Looks already seeded'
            return nil
        end

        job_offers = []
        original_language = I18n.locale
        I18n.available_locales.each do |lang|
            I18n.locale = lang.to_sym
            job_offers << {  
                title: (I18n.t 'project_manager_assistant'),
                description: (I18n.t 'project_manager_assistant_offer'),
                language: lang.to_s,
                application_uri: nil           
            }
            # add more job offers below
        end
        I18n.locale = original_language

        job_offers.each do |offer|
            job_offer = LaastrasJobOffer.new({
                title: offer[:title],
                description: offer[:description],
                application_uri: offer[:application_uri],
                language: offer[:language]
            })
            if job_offer.save
                sql_query = "SELECT * FROM laastras_job_offers WHERE title = '#{job_offer.title}'"
                db_offer = LaastrasJobOffer.find_by_sql(sql_query).first
                db_offer.update({
                    application_uri: url_for(
                        controller: 'laastras_job_offers',
                        action: 'apply',
                        id: db_offer.id
                    )
                })
            else
                logger.debug "--- We failed to save to database the job offer: #{job_offer.title}"
            end
        end

    end # seed

end
