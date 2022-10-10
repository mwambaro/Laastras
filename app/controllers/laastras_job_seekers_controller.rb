class LaastrasJobSeekersController < ApplicationController
    before_action :init_parameters 

    def index
    end

    def show 
    end

    def fill_in_form
        @countries_countrycodes_list = [
            'Burundi (+257)',
            'Uganda (+256)',
            'Rwanda (+250)',
            'RDC (+252)',
            'Tanzania (+255)',
            'Kenya (+254)'
        ]

    end # fill_in_form

    def store_form
        data = nil
        redirect_uri = nil
        begin
            job_offer_id = params[:job_offer_id]
            user_id = ApplicationHelper.who_is_logged_in?(session)

            # CV
            fname = params[:file][:uploaded_cv_file].original_filename
            cv_full_path = ApplicationHelper.job_seeker_asset_url(fname)
            cv_mime_type = params[:file][:uploaded_cv_file].content_type
            data = params[:file][:uploaded_cv_file].read
            begin
                File.open(cv_full_path, "wb"){|io| io.write(data)}
            rescue Exception => ee 
                logger.debug 'IO exception (cv): ' + ee.message
            end
            # Cover Letter
            fname = params[:file][:uploaded_cover_letter_file].original_filename
            cover_letter_full_path = ApplicationHelper.job_seeker_asset_url(fname)
            cover_letter_mime_type = params[:file][:uploaded_cover_letter_file].content_type
            data = params[:file][:uploaded_cover_letter_file].read
            begin
                File.open(cover_letter_full_path, "wb"){|io| io.write(data)}
            rescue Exception => ee 
                logger.debug 'IO exception (cover_letter): ' + ee.message
            end

            permitted_params = {
                user_id: user_id,
                job_offer_id: job_offer_id,
                location: params[:location],
                phone_number: params[:phone_number],
                cv_mime_type: cv_mime_type,
                cv_uri: cv_full_path,
                cover_letter_mime_type: cover_letter_mime_type,
                cover_letter_uri: cover_letter_full_path
            }

            jsk = LaastrasJobSeeker.new(permitted_params)
            if jsk.save 
                data = {
                    code: 1,
                    message: (I18n.t 'job_seeker_form_success'),
                    redirect_uri: redirect_uri
                }
            else
                data = {
                    code: 0,
                    message: (I18n.t 'job_seeker_form_failure'),
                    redirect_uri: redirect_uri
                }
            end
        rescue Exception => e 

            logger.debug "EXCEPTION: #{e.message}"

            data = {
                code: 0,
                message: e.message,
                redirect_uri: redirect_uri
            }
        
        end
        
        # send data to caller
        render plain: JSON.generate(data) unless data.nil?

    end # store_form

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

end
