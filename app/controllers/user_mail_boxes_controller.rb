class UserMailBoxesController < ApplicationController
    before_action :init_parameters

    def send_mail_box 
        next_uri = nil 
        begin 
            @mailer = {
                laastras_send_mail_form_label: (I18n.t 'laastras_send_mail_form_label'),
                laastras_send_mail_action_url: url_for(
                    controller: 'user_mail_boxes', 
                    action: 'send_mail'
                ),
                your_email_label: (I18n.t 'your_email_label'),
                subject_label: (I18n.t 'subject_label'),
                body_placeholder_text: (I18n.t 'send_mail_body_placeholder_text'),
                submit_label: (I18n.t 'submit_label')
            }
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # send_mail_box
    
    # POST 
    def send_mail 
        next_uri = nil 
        data = nil
        begin 
            email = params[:email]
            subject = params[:subject]
            body = params[:body]
            to = params[:to_email] || 'onkezabahizi@gmail.com'
            if(
                email.nil? || email.blank? || subject.nil? || 
                subject.blank? || body.nil? || body.blank?
            )
                msg = 'An important mailer argument may be null or empty'
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + msg
                logger.debug message unless logger.nil?
                data = {
                    code: 0,
                    message: (I18n.t 'send_mail_box_component_missing')
                }
            else
                @mailer = {
                    to: to,
                    from: email,
                    subject: subject,
                    message: body
                }
                val = @users_helper_factory.send_mail(@mailer)
                if val 
                    mssg = 'user feedback email successfully sent.'
                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + mssg
                    logger.debug message unless logger.nil?
                else 
                    mssg = 'We failed to send user feedback email'
                    message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + mssg
                    logger.debug message unless logger.nil?
                end
                data = {
                    code: 1,
                    message: (I18n.t 'send_mail_box_success')
                }
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

        # send data to caller
        render plain: JSON.generate(data) unless data.nil?

    end # send_mail

    def init_parameters 
        next_uri = nil 
        begin 
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.set_locale_from_request(request, logger, session)
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
