class UserMailer < ApplicationMailer
    before_action :init_parameters
    
    # Subject can be set in your I18n file at config/locales/en.yml
    # with the following lookup:
    #
    #   en.user_mailer.welcome.subject
    #
    def welcome 
        begin 
            @welcome_message = params[:welcome_message]
            @user = params[:user]
            @verify_email_url = params[:verify_email_url]
            
            logger.debug "---> #{Time.now}: banner image url not set" if @laastras_banner_image.nil?
            #banner_filename = Pathname.new(@laastras_banner_image).basename.to_s
            #attachments["#{banner_filename}"] = File.read(@laastras_banner_image)

            mail to: @user.email, subject: (I18n.t 'user_welcome_email')
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

    end # welcome

    # Subject can be set in your I18n file at config/locales/en.yml
    # with the following lookup:
    #
    #   en.user_mailer.reset_password.subject
    #
    def reset_password
        @greeting = "Hi"

        mail to: "to@example.org"
    end

    # Subject can be set in your I18n file at config/locales/en.yml
    # with the following lookup:
    #
    #   en.user_mailer.job_application_submission.subject
    #
    def job_application_submission
        @greeting = "Hi"

        mail to: "to@example.org"
    end

    # Subject can be set in your I18n file at config/locales/en.yml
    # with the following lookup:
    #
    #   en.user_mailer.selected_for_job.subject
    #
    def selected_for_job
        @greeting = "Hi"

        mail to: "to@example.org"
    end

    def init_parameters 
        begin 
            session = params[:session] if session.nil?
            request = params[:request] if request.nil?
            unless session.nil?
                I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            end
            
            @laastras_banner_image = ApplicationHelper.banner_image_asset_url(
                request
            )
            @logo_image_url = ApplicationHelper.image_asset_url(
                request, 'Logo-03.svg'
            )
            
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

    end # init_parameters
end
