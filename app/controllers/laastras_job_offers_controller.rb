class LaastrasJobOffersController < ApplicationController
    before_action :init_parameters

    def index 
        next_uri = nil
        begin 
            language = I18n.locale.to_s
            sql_query = "SELECT * FROM laastras_job_offers WHERE language = '#{language}' ORDER BY created_at"
            offers = LaastrasJobOffer.find_by_sql(sql_query)
        
            @all_job_offers = []
            applicants_label = I18n.t 'applicants_label'
            apply_label = I18n.t 'apply_label'
            @close_label = I18n.t 'close_label'
            job_type = params[:job_type] || nil
            counter = 1
            admin = ApplicationHelper.user_has_admin_role?(session)

            offers.each do |job_offer|
                start_up = ApplicationHelper.job_offer_guid_to_job_offer(job_offer.sha256)
                if start_up.nil? && job_type == :start_up.to_s 
                    next
                end

                if job_offer.archived && job_type != :start_up.to_s
                    msg  = 'The job offer [' + job_offer.title + '] has been archived'
                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + msg
                    logger.debug message unless logger.nil?
                    next 
                end

                html_ids = {
                    close_button_id: "close-btn-id-#{counter}",
                    offer_title_html_id: "job-offer-id-title-#{counter}",
                    offer_html_id: "job-offer-id-#{counter}",
                    feature_job_button_id: "feature-job-btn-id-#{counter}",
                    unfeature_job_button_id: "unfeature-job-btn-id-#{counter}",
                    archive_job_button_id: "archive-job-btn-id-#{counter}"
                }
                if admin

                    unless start_up.nil?
                        if job_offer.archived 
                            @close_label = nil
                            @close_job_url = nil
                        else
                            @close_label = I18n.t 'archive_label'
                            @close_job_url = url_for(
                                controller: 'laastras_job_offers', 
                                action: 'archive', 
                                id: job_offer.id
                            )
                        end
                    else
                        @close_label = I18n.t 'close_label'
                        @close_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'close', 
                            id: job_offer.id
                        )
                    end

                    if job_offer.featured
                        @feature_label = I18n.t 'unfeature_label'
                        @feature_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'unfeature', 
                            id: job_offer.id
                        )
                    else
                        @feature_label = I18n.t 'feature_label'
                        @feature_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'feature', 
                            id: job_offer.id
                        )
                    end

                    if job_offer.archived 
                        @feature_label = nil
                        @feature_job_url = nil
                    end

                    job_offer_actions = {
                        feature_label: @feature_label,
                        close_label: @close_label,
                        feature_job_url: @feature_job_url,
                        close_job_url: @close_job_url,
                        archived: job_offer.archived.to_s,
                        admin: admin.to_s,
                        apply_label: applicants_label,
                        application_url: url_for(
                            controller: 'laastras_job_seekers',
                            action: 'index_jsk',
                            job_offer_id: job_offer.id
                        )
                    }
                    @all_job_offers << {
                        job_offer_title: job_offer.title,
                        job_offer_description: job_offer.description,
                        job_offer_id: job_offer.id,
                        html_ids: html_ids,
                        job_offer_actions: job_offer_actions
                    }
                else
                    @close_label = nil
                    @feature_label = nil
                    job_offer_actions = {
                        feature_label: @feature_label,
                        close_label: @close_label,
                        apply_label: apply_label,
                        archived: job_offer.archived.to_s,
                        admin: admin.to_s,
                        feature_job_url: nil,
                        close_job_url: nil,
                        application_url: url_for(
                            controller: 'laastras_job_offers', 
                            action: 'apply', 
                            id: job_offer.id
                        )
                    }
                    @all_job_offers << {
                        job_offer_title: job_offer.title,
                        job_offer_description: job_offer.description,
                        job_offer_actions: job_offer_actions,
                        job_offer_id: job_offer.id,
                        html_ids: html_ids
                    }
                end
                counter += 1
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
            id = params[:id]
            start_up = nil
            job_type = params[:job_type] || nil
            job_offer_guid = params[:job_offer_guid]
            unless id.nil?
                @job_offer = LaastrasJobOffer.find(id)
            else
                @job_offer = ApplicationHelper.job_offer_guid_to_job_offer(job_offer_guid)
                start_up = @job_offer
            end

            unless @job_offer.nil?
                if @job_offer.archived && job_type != :start_up.to_s
                    raise 'The job offer [' + @job_offer.title + '] has been archived'
                end 

                if start_up.nil?
                    start_up = ApplicationHelper.job_offer_guid_to_job_offer(@job_offer.sha256)
                end
                admin = ApplicationHelper.user_has_admin_role?(session)

                if admin
                    @apply_label = (I18n.t 'applicants_label')
                    unless start_up.nil?
                        if @job_offer.archived 
                            @close_label = nil
                            @close_job_url = nil
                        else
                            @close_label = I18n.t 'archive_label'
                            @close_job_url = url_for(
                                controller: 'laastras_job_offers', 
                                action: 'archive', 
                                id: @job_offer.id
                            )
                        end
                    else
                        @close_label = I18n.t 'close_label'
                        @close_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'close', 
                            id: @job_offer.id
                        )
                    end

                    if @job_offer.featured == true
                        @feature_label = I18n.t 'unfeature_label'
                        @feature_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'unfeature', 
                            id: @job_offer.id
                        )
                    else
                        @feature_label = I18n.t 'feature_label'
                        @feature_job_url = url_for(
                            controller: 'laastras_job_offers', 
                            action: 'feature', 
                            id: @job_offer.id
                        )
                    end

                    if @job_offer.archived 
                        @feature_label = nil
                        @feature_job_url = nil
                    end
                    
                    @application_url = url_for(
                        controller: 'laastras_job_seekers',
                        action: 'index_jsk',
                        job_offer_id: @job_offer.id
                    )
                else
                    @apply_label = (I18n.t 'apply_label')
                    @close_label = nil
                    @feature_label = nil
                    @application_url = url_for(
                        controller: 'laastras_job_offers', 
                        action: 'apply', 
                        id: @job_offer.id
                    )
                end
                
                @html_ids = {
                    close_button_id: "close-btn-id",
                    offer_title_html_id: "job-offer-id-title",
                    offer_html_id: "job-offer-id",
                    feature_job_button_id: "feature-job-btn-id",
                    unfeature_job_button_id: "unfeature-job-btn-id",
                    archive_job_button_id: "archive-job-btn-id"
                }
                @job_offer_actions = {
                    feature_label: @feature_label,
                    close_label: @close_label,
                    apply_label: @apply_label,
                    feature_job_url: @feature_job_url,
                    close_job_url: @close_job_url,
                    application_url: @application_url, 
                    archived: @job_offer.archived.to_s,
                    admin: admin.to_s
                }
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
            if user.nil?
                next_uri = url_for(
                    controller: 'laastras', 
                    action: 'sign_in', 
                    redirect_uri: request.original_url
                )
            elsif( # is email verified ?
                user.verify_email_token.nil? || 
                user.verify_email_token.blank? || 
                user.verify_email_token != :verified.to_s
            )
                redirect_uri = request.original_url
                val = @users_helper_factory.send_welcome_user_mail(user, redirect_uri)
                if val 
                    mssg = 'Welcome email successfully sent.'
                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + mssg
                    logger.debug message unless logger.nil?
                else 
                    mssg = 'We failed to send welcome email to user'
                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + mssg
                    logger.debug message unless logger.nil?
                end

                session[:fail_safe_title] = I18n.t 'verify_email_before_job_application_title'
                session[:fail_safe_message] = I18n.t 'verify_email_before_job_application_message'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
            else
                job_offer = LaastrasJobOffer.find(params[:id])
                if job_offer 
                    job_seeker = LaastrasJobSeeker.find_by_user_id(user.id)
                    unless job_seeker.nil?
                        session[:fail_safe_title] = I18n.t 'you_have_already_applied_title'
                        session[:fail_safe_message] = I18n.t 'you_have_already_applied_message'
                        next_uri = url_for(
                            controller: 'maintenance', 
                            action: 'fail_safe'
                        )
                    else
                        next_uri = url_for(
                            controller: 'laastras_job_seekers', 
                            action: 'fill_in_form',
                            job_offer_id: job_offer.id
                        )
                    end
                else
                    next_uri = url_for(
                        controller: 'maintenance', 
                        action: 'fail_safe'
                    )
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

    end # apply 

    def feature 
        next_uri = nil 
        begin
            id = params[:id]
            offer = LaastrasJobOffer.find(id)
            unless offer.nil?
                failed = false
                I18n.available_locales.each do |locale|
                    sha256 = offer.sha256
                    sql = "SELECT * FROM laastras_job_offers WHERE language = '#{locale.to_s}' AND sha256 = '#{sha256}'"
                    offers = LaastrasJobOffer.find_by_sql(sql)
                    offers.each do |off|
                        ret = off.update({featured: true})
                        unless ret
                            ApplicationHelper.log_model_errors(off, logger)
                            failed = true
                        end
                    end
                end

                if failed 
                    session[:fail_safe_title] = I18n.t 'job_offer_failed_featuring'
                    session[:fail_safe_message] = I18n.t 'job_offer_failed_featuring_message'
                else
                    session[:fail_safe_title] = I18n.t 'job_offer_successful_featuring'
                    session[:fail_safe_message] = I18n.t 'job_offer_successful_featuring_message'
                end
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

    end # feature

    def unfeature 
        next_uri = nil 
        begin
            id = params[:id]
            offer = LaastrasJobOffer.find(id)
            unless offer.nil?
                failed = false
                I18n.available_locales.each do |locale|
                    sha256 = offer.sha256
                    sql = "SELECT * FROM laastras_job_offers WHERE language = '#{locale.to_s}' AND sha256 = '#{sha256}'"
                    offers = LaastrasJobOffer.find_by_sql(sql)
                    offers.each do |off|
                        ret = off.update({featured: false})
                        unless ret
                            ApplicationHelper.log_model_errors(off, logger)
                            failed = true
                        end
                    end
                end

                if failed
                    session[:fail_safe_title] = I18n.t 'job_offer_failed_unfeaturing'
                    session[:fail_safe_message] = I18n.t 'job_offer_failed_unfeaturing_message'
                else
                    session[:fail_safe_title] = I18n.t 'job_offer_successful_unfeaturing'
                    session[:fail_safe_message] = I18n.t 'job_offer_successful_unfeaturing_message'
                end
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

    end # unfeature

    def archive 
        next_uri = nil 
        begin
            id = params[:id]
            offer = LaastrasJobOffer.find(id)
            unless offer.nil?
                failed = false
                I18n.available_locales.each do |locale|
                    sha256 = offer.sha256
                    sql = "SELECT * FROM laastras_job_offers WHERE language = '#{locale.to_s}' AND sha256 = '#{sha256}'"
                    offers = LaastrasJobOffer.find_by_sql(sql)
                    offers.each do |off|
                        job_offer_id = off.id
                        ret = off.update({archived: true, featured: false})
                        unless ret
                            ApplicationHelper.log_model_errors(off, logger)
                            failed = true
                        end
                    end 
                end 
                session[:fail_safe_title] = I18n.t 'job_offer_successful_archiving'
                session[:fail_safe_message] = I18n.t 'job_offer_successful_archiving_message'
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

    end # archive

    def close 
        next_uri = nil 
        begin
            id = params[:id]
            offer = LaastrasJobOffer.find(id)
            unless offer.nil?
                failed = false
                I18n.available_locales.each do |locale|
                    sha256 = offer.sha256
                    sql = "SELECT * FROM laastras_job_offers WHERE language = '#{locale.to_s}' AND sha256 = '#{sha256}'"
                    offers = LaastrasJobOffer.find_by_sql(sql)
                    offers.each do |off|
                        job_offer_id = off.id
                        ret = off.destroy!
                        unless ret
                            ApplicationHelper.log_model_errors(off, logger)
                            failed = true
                        end
                        # Invalidate job seekers
                        sql = "SELECT * FROM laastras_job_seekers WHERE job_offer_id = '#{job_offer_id}'"
                        job_seekers = LaastrasJobSeeker.find_by_sql(sql)
                        job_seekers.each do |job_seeker|
                            cv_uri = job_seeker.cv_uri
                            cover_letter_uri = job_seeker.cover_letter_uri
                            job_seeker.destroy!
                            # Clean up cv file
                            unless (
                                cv_uri.nil? || cv_uri.blank?
                            )
                                if File.exists? cv_uri
                                    File.delete(cv_uri) 
                                end
                            end
                            # Clean up cover letter file
                            unless (
                                cover_letter_uri.nil? || cover_letter_uri.blank?
                            )
                                if File.exists? cover_letter_uri
                                    File.delete(cover_letter_uri) 
                                end
                            end
                        end
                    end
                end
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

            @headerData = ApplicationHelper::SiteHeaderData.new(request, logger)
            @users_helper_factory = UsersHelper::UsersHelperFactory.new(request, logger, session)
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
