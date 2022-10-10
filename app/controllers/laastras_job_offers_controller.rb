class LaastrasJobOffersController < ApplicationController
    before_action :init_parameters

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
                    action: 'fill_in_form',
                    job_offer_id: job_offer.id
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

        @headerData = ApplicationHelper::SiteHeaderData.new(request)
        @headerData.seed_job_offers

    end # init_parameters

end
