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
                session: nil,
                request: nil
            ).welcome.deliver_now
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/reset_password
    def reset_password
        user = User.find_by_role(:admin.to_s)
        unless user.nil?
            email = user.email 
            hash = user.password
            reset_password_url = "/users/reset_password?email=#{URI.encode(email)}&password=#{hash}"
            UserMailer.with(
                reset_password_message: (I18n.t 'password_reset_message'),
                reset_password_url: reset_password_url,
                user: user,
                session: nil,
                request: nil
            ).reset_password.deliver_now
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/job_application_submission
    def job_application_submission
        user = User.find_by_role(:admin.to_s)
        job_application_title = I18n.t 'project_manager_assistant'
        laastras_mission_url = "/laastras/about"
        unless user.nil? 
            UserMailer.with(
                acknowledge_reception_message: (I18n.t 'acknowledge_reception_message'),
                job_application_title: job_application_title,
                laastras_mission_url: laastras_mission_url,
                user: user,
                session: nil,
                request: nil
            ).job_application_submission.deliver_now
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/selected_for_job
    def selected_for_job
        user = User.find_by_role(:admin.to_s)
        unless user.nil?
            job_seeker = LaastrasJobSeeker.find_by_user_id(user.id)
            unless job_seeker.nil?
                job_offer = LaastrasJobOffer.find(job_seeker.job_offer_id)
                unless job_offer.nil?
                    @selected_for_job_title = job_offer.title
                    @selected_for_job_message = (I18n.t 'selected_for_job_message') + " " + @selected_for_job_title
                    UserMailer.with(
                        user: user,
                        selected_for_job_title: @selected_for_job_title,
                        selected_for_job_message: @selected_for_job_message,
                        session: nil,
                        request: nil
                    ).selected_for_job.deliver_now
                end
            end
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/rejected_for_job
    def rejected_for_job
        user = User.find_by_role(:admin.to_s)
        unless user.nil?
            job_seeker = LaastrasJobSeeker.find_by_user_id(user.id)
            unless job_seeker.nil?
                job_offer = LaastrasJobOffer.find(job_seeker.job_offer_id)
                unless job_offer.nil?
                    @rejected_for_job_title = job_offer.title
                    @rejected_for_job_message = (I18n.t 'rejected_for_job_message')
                    UserMailer.with(
                        user: user,
                        rejected_for_job_title: @rejected_for_job_title,
                        rejected_for_job_message: @rejected_for_job_message,
                        session: nil,
                        request: nil
                    ).rejected_for_job.deliver_now
                end
            end
        end
    end

    # Preview this email at http://localhost:3000/rails/mailers/user_mailer/send_mail
    def send_mail 
        UserMailer.with(
            to: 'obed-edom@laastras.org',
            from: 'onkezabahizi@gmail.com',
            subject: (I18n.t 'sample_send_mail_subject'),
            message: (I18n.t 'sample_send_mail_message'),
            session: nil,
            request: nil
        ).send_mail.deliver_now
    end 

end
