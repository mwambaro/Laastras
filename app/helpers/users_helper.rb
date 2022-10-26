module UsersHelper
    class UsersHelperFactory < ApplicationController
        def initialize(request, logger=nil, session=nil)
            self.request = request
            self.logger = logger
            @session = session

        end # initialize 

        def send_welcome_user_mail(user, redirect_uri=nil)
            ret_val = true
            begin 
                raise 'no valid user given in argument' if user.nil? 

                token = Time.now.to_i.to_s
                welcome_message = I18n.t 'generic_welcome_message'
                verify_email_url = nil
                locale = I18n.locale.to_s
                if redirect_uri.nil? || redirect_uri.blank?
                    verify_email_url = url_for(
                        controller: 'users',
                        action: 'verify_email',
                        token: token,
                        id: user.id,
                        locale: locale
                    )
                else 
                    verify_email_url = url_for(
                        controller: 'users',
                        action: 'verify_email',
                        token: token,
                        id: user.id,
                        redirect_uri: URI.encode(redirect_uri),
                        locale: locale
                    )
                end

                unless user.update({verify_email_token: token})
                    raise 'Failed to update user with verify email token'
                end

                mailer = UserMailer.with(
                    welcome_message: welcome_message,
                    verify_email_url: verify_email_url,
                    user: user,
                    # set them to nil due to: ActiveJob::SerializationError (Unsupported argument type)
                    session: nil,
                    request: nil
                ).welcome 

                if Rails.env.match?(/\Aproduction\Z/i)
                    mailer.deliver_now
                else 
                    mailer.deliver_later
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                        __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
                ret_val = false
            end

            ret_val

        end # send_welcome_user_mail

        def send_reset_password_user_mail(user, reset_password_url)
            ret_val = true 
            begin 
                mailer = UserMailer.with(
                    reset_password_message: (I18n.t 'password_reset_message'),
                    reset_password_url: reset_password_url,
                    user: user,
                    # set them to nil due to: ActiveJob::SerializationError (Unsupported argument type)
                    session: nil,
                    request: nil
                ).reset_password

                if Rails.env.match?(/\Aproduction\Z/i)
                    mailer.deliver_now
                else 
                    mailer.deliver_later
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                        __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
                ret_val = false
            end

            ret_val

        end # send_reset_password_user_mail 

        def send_job_app_submission_ack_reception(user, job_application_title) 
            ret_val = true 
            begin 
                locale = I18n.locale.to_s
                mailer = UserMailer.with(
                    acknowledge_reception_message: (I18n.t 'acknowledge_reception_message'),
                    job_application_title: job_application_title,
                    laastras_mission_url: url_for(
                        controller: 'laastras', 
                        action: 'about', 
                        locale: locale
                    ),
                    user: user,
                    # set them to nil due to: ActiveJob::SerializationError (Unsupported argument type)
                    session: nil,
                    request: nil
                ).job_application_submission

                if Rails.env.match?(/\Aproduction\Z/i)
                    mailer.deliver_now
                else 
                    mailer.deliver_later
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                        __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
                ret_val = false
            end

            ret_val

        end # send_job_app_submission_ack_reception 

        def send_rejected_for_job_offer_email(user, job_seeker)
            ret_val = true 
            begin 
                job_offer = LaastrasJobOffer.find(job_seeker.job_offer_id)
                unless job_offer.nil?
                    @rejected_for_job_title = job_offer.title
                    @rejected_for_job_message = (I18n.t 'rejected_for_job_message') + " ==> " + @rejected_for_job_title
                    mailer = UserMailer.with(
                        user: user,
                        rejected_for_job_title: @rejected_for_job_title,
                        rejected_for_job_message: @rejected_for_job_message,
                        # set them to nil due to: ActiveJob::SerializationError (Unsupported argument type)
                        session: nil,
                        request: nil
                    ).rejected_for_job

                    if Rails.env.match?(/\Aproduction\Z/i)
                        mailer.deliver_now
                    else 
                        mailer.deliver_later
                    end
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
                ret_val = false
            end
    
            ret_val

        end # send_rejected_for_job_offer_email

        def send_selected_for_job_offer_email(user, job_seeker)
            ret_val = true 
            begin 
                job_offer = LaastrasJobOffer.find(job_seeker.job_offer_id)
                unless job_offer.nil?
                    @selected_for_job_title = job_offer.title
                    @selected_for_job_message = (I18n.t 'selected_for_job_message') + " ==> " + @selected_for_job_title
                    mailer = UserMailer.with(
                        user: user,
                        selected_for_job_title: @selected_for_job_title,
                        selected_for_job_message: @selected_for_job_message,
                        # set them to nil due to: ActiveJob::SerializationError (Unsupported argument type)
                        session: nil,
                        request: nil
                    ).selected_for_job

                    if Rails.env.match?(/\Aproduction\Z/i)
                        mailer.deliver_now
                    else 
                        mailer.deliver_later
                    end
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
                ret_val = false
            end
    
            ret_val

        end # send_selected_for_job_offer_email

    end
end
