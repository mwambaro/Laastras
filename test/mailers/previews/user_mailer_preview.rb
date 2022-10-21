# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/welcome
    def welcome
        user = User.find_by_role(:admin.to_s)
        unless user.nil?
            verify_email_url = "/users/verify_email?token=#{Time.now.to_i.to_s}&id=#{user.id}"
            UserMailer.with(
                welcome_message: (I18n.t 'generic_welcome_message'), 
                verify_email_url: verify_email_url,
                user: user,
                session: nil
            ).welcome.deliver_now
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/reset_password
    def reset_password
        UserMailer.reset_password
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/job_application_submission
    def job_application_submission
        UserMailer.job_application_submission
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/selected_for_job
    def selected_for_job
        UserMailer.selected_for_job
    end

end
