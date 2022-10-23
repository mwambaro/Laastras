class LaastrasJobSeekersController < ApplicationController
    before_action :init_parameters 

    def index_jsk
        next_uri = nil
        begin
            @job_offer_id = params[:job_offer_id]
            unless @job_offer_id.nil?
                @job_offer = LaastrasJobOffer.find(@job_offer_id)
            end 

            unless @job_offer.nil?
                @laastras_jskers = []
                LaastrasJobSeeker.all.each do |jsker| 
                    logger.debug "---> #{jsker.job_offer_id} ??== #{@job_offer.id}"
                    if jsker.job_offer_id == @job_offer.id
                        @laastras_jskers << jsker 
                    end
                end
            else
                @laastras_jskers = LaastrasJobSeeker.all
            end

            if @laastras_jskers.count == 0
                session[:fail_safe_title] = I18n.t 'no_applicants_yet'
                session[:fail_safe_message] = I18n.t 'no_applicants_yet_message'
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

    end # index_jsk

    def show_jsk
        next_uri = nil
        begin 
            @laastras_user = ApplicationHelper.who_is_logged_in?(session)

            if @laastras_user
                sql_query = "SELECT * FROM laastras_job_seekers WHERE user_id = '#{@laastras_user.id}'"
                @laastras_jsker = LaastrasJobSeeker.find_by_sql(sql_query).first
                unless @laastras_jsker
                    logger.debug 'Failed to find job seeker with user id: ' + @laastras_user.id
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                end
            else
                next_uri = url_for(
                    controller: 'laastras', action: 'sign_in'
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

    end # show_jsk

    def show_jsk_doc 
        next_uri = nil 
        begin
            id = params[:id]
            type = params[:type]
            data = nil

            job_seeker = LaastrasJobSeeker.find(id)
            if job_seeker 
                uri = nil 
                mime_type = nil
            
                if /\Acover_letter\Z/i =~ type
                    uri = job_seeker.cover_letter_uri
                    mime_type = job_seeker.cover_letter_mime_type
                elsif /\Acv\Z/i =~ type
                    uri = job_seeker.cv_uri
                    mime_type = job_seeker.cv_mime_type
                else
                    logger.debug 'Invalid job seeker document type: ' + type
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                end
            
                data = File.open(uri, 'rb'){ |io| io.read }
                if data
                    fname = Pathname.new(uri).basename.to_s
                    options = ApplicationHelper.build_send_data_options(request, fname, mime_type)

                    logger.debug '.... Sending file: ' + options[:filename] + 
                            ', with mime type: ' + options[:type] +
                            ', in data disposition: ' + options[:disposition]

                    send_data data, options
                else 
                    logger.debug 'Failed to read data from file: ' + 
                            Pathname.new(uri).basename.to_s
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                end
            else
                logger.debug 'Could not find job seeker with id: ' + id.to_s
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

    end # show_jsk_doc

    def fill_in_form
        begin
            @countries_countrycodes_list = [
                'Burundi (+257)',
                'Uganda (+256)',
                'Rwanda (+250)',
                'RDC (+252)',
                'Tanzania (+255)',
                'Kenya (+254)'
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

    end # fill_in_form

    def store_form
        data_to_send = nil
        redirect_uri = nil
        begin
            job_offer_id = params[:job_offer_id]
            user = ApplicationHelper.who_is_logged_in?(session)
            unless user 
                message = I18n.t 'no_user_logged_in'
                data_to_send = {
                    code: 0,
                    message: message,
                    redirect_uri: redirect_uri
                }
            else 

                user_id = user.id
                job_offer = LaastrasJobOffer.find(job_offer_id)
                if job_offer.nil?
                    raise 'We could not find any job offer with id: ' + job_offer
                end

                # Have you already applied?
                sql_query = "SELECT * FROM laastras_job_seekers WHERE user_id = '#{user_id}'"
                sk = LaastrasJobSeeker.find_by_sql(sql_query).first
                if sk 
                    message = I18n.t 'already_applied_for_job'
                    data_to_send = {
                        code: 1,
                        message: message,
                        redirect_uri: redirect_uri
                    }
                else 

                    # CV
                    filename = params[:file][:uploaded_cv_file].original_filename
                    fname = ApplicationHelper.unique_file_name(filename, logger)
                    raise "Failed to generate unique name for file: #{filename}" if (fname.nil? || fname.blank?)
                    cv_full_path = ApplicationHelper.job_seeker_asset_url(fname)
                    cv_mime_type = params[:file][:uploaded_cv_file].content_type
                    data = params[:file][:uploaded_cv_file].read 
                    if data.size > ApplicationHelper.max_job_seeker_doc_size 
                        message = (I18n.t 'beyond_max_job_seeker_doc_size_message') + 
                                  " (#{fname})"
                        data_to_send = {
                            code: 0, 
                            message: message,
                            redirect_uri: redirect_uri
                        }
                    else
                        begin
                            File.open(cv_full_path, "wb"){|io| io.write(data)}
                        rescue Exception => ee 
                            logger.debug 'IO exception (cv): ' + ee.message
                        end
                        # Cover Letter
                        filename = params[:file][:uploaded_cover_letter_file].original_filename
                        fname = ApplicationHelper.unique_file_name(filename, logger)
                        raise "Failed to generate unique name for file: #{filename}" if (fname.nil? || fname.blank?)
                        cover_letter_full_path = ApplicationHelper.job_seeker_asset_url(fname)
                        cover_letter_mime_type = params[:file][:uploaded_cover_letter_file].content_type
                        data = params[:file][:uploaded_cover_letter_file].read
                        if data.size > ApplicationHelper.max_job_seeker_doc_size 
                            message = (I18n.t 'beyond_max_job_seeker_doc_size_message') + 
                                      " (#{fname})"
                            data_to_send = {
                                code: 0,
                                message: message,
                                redirect_uri: redirect_uri
                            }
                        else
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
                                data_to_send = {
                                    code: 1,
                                    message: (I18n.t 'job_seeker_form_success'),
                                    redirect_uri: redirect_uri
                                }
                                
                                job_application_title = job_offer.title
                                val = @users_helper_factory
                                    .send_job_app_submission_ack_reception(
                                        user, job_application_title
                                    )
                                if val 
                                    mssg = 'Job application reception acknowledgment email successfully sent.'
                                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                                __method__.to_s + "--- " + mssg
                                    logger.debug message unless logger.nil?
                                else 
                                    mssg = 'We failed to send job application reception acknowledgment email to user'
                                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                                __method__.to_s + "--- " + mssg
                                    logger.debug message unless logger.nil?
                                end
                            else
                                if jsk.errors.count > 0 
                                    message = ""
                                    jsk.errors.each do |error| 
                                        message += "\r\n#{error.full_message}"
                                    end
                                    msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                            __method__.to_s + "--- " + message
                                    logger.debug msg
                                end

                                data_to_send = {
                                    code: 0,
                                    message: (I18n.t 'job_seeker_form_failure'),
                                    redirect_uri: redirect_uri
                                }
                            end
                        end 
                    end
                end
            end
        rescue Exception => e 

            logger.debug "EXCEPTION: #{e.message}"

            data_to_send = {
                code: 0,
                message: e.message,
                redirect_uri: redirect_uri
            }
        
        end
        
        # send data to caller
        render plain: JSON.generate(data_to_send) unless data_to_send.nil?

    end # store_form

    def init_parameters 
        next_uri = nil 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.set_locale_from_request(request, logger)
            @site_title = "Laastras | #{params[:action]}"
            @users_helper_factory = UsersHelper::UsersHelperFactory.new(request, logger, session)
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
