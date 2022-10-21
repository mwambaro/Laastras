class UserMailer < ApplicationMailer

    # Subject can be set in your I18n file at config/locales/en.yml
    # with the following lookup:
    #
    #   en.user_mailer.welcome.subject
    #
    def welcome 
        begin 
            @welcome_message = params[:welcome_message]
            @user = params[:user]

            mail to: user.email, subject: (I18n.t 'user_welcome_email')
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
end
