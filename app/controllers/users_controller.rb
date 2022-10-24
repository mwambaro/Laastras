class UsersController < ApplicationController
    before_action :set_laastras_user, only: %i[ show edit update destroy profile_image_show profile_image_update ]

    def index
        next_uri = nil 
        begin 
            init_parameters
            if ApplicationHelper.user_has_admin_role?(session)
                @laastras_users = User.all
            else 
                next_uri = url_for(controller: 'laastras', action: 'home')
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
            init_parameters
            @view_mode = false.to_s
            @full_name = "#{@laastras_user.first_name} #{@laastras_user.last_name}"
            @role = I18n.t @laastras_user.role 
            @email = @laastras_user.email
            @username = @laastras_user.user_name
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

    def edit 
        next_uri = nil 
        begin
            init_parameters
            laastras_user = ApplicationHelper.who_is_logged_in?(session)
            unless laastras_user.nil?
                if @laastras_user.id == laastras_user.id 
                    @laastras_object = {
                        email: @laastras_user.email,
                        first_name: @laastras_user.first_name,
                        last_name: @laastras_user.last_name,
                        user_name: @laastras_user.user_name,
                        role: @laastras_user.role
                    }
                else
                    next_uri = url_for(controller: 'laastras', action: 'home')
                end
            else
                next_uri = url_for(controller: 'laastras', action: 'home')
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

    end # edit

    def destroy 
        next_uri = nil 
        begin
            init_parameters
            @require_confirmation = false
            laastras_user = ApplicationHelper.who_is_logged_in?(session)
            unless laastras_user.nil?
                if @laastras_user.id == laastras_user.id 
                    if params[:confirm].nil? # require confirmation
                        @require_confirmation = true
                        @message = I18n.t 'laastras_account_confirm_remove'
                    else
                        if params[:confirm] =~ /\Ayes\Z/i # proceed
                            @require_confirmation = false
                            photo_uri = @laastras_user.photo_uri
                            user_id = @laastras_user.id
                            ApplicationHelper.logout_user(session)
                            @laastras_user.destroy!
                            # Clean up profile photo
                            unless (
                                photo_uri.nil? || photo_uri.blank?
                            )
                                if File.exists? photo_uri
                                    File.delete(photo_uri) 
                                end
                            end
                            # Invalidate job seeker
                            job_seeker = LaastrasJobSeeker.find_by_user_id(user_id)
                            unless job_seeker.nil?
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
                            # Report
                            @message = I18n.t 'laastras_account_removed'
                        else 
                            if params[:redirect_uri].nil?
                                next_uri = url_for(controller: 'laastras', action: 'home')
                            else
                                next_uri = params[:redirect_uri]
                            end
                        end
                    end
                else
                    next_uri = url_for(controller: 'laastras', action: 'home')
                end
            else
                next_uri = url_for(controller: 'laastras', action: 'home')
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

    end # destroy

    # GET /laastras_users/profile_image_show?id=1
    def profile_image_show
        next_uri = nil 
        begin
            # logger.debug "---> PARAMS: #{params.inspect}"
            unless @laastras_user.nil?
                unless @laastras_user.photo_uri.nil?
                    uri = @laastras_user.photo_uri
                    mime_type = @laastras_user.photo_mime_type
                    data = File.open(uri, 'rb'){ |io| io.read }
                    send_data data, :type => mime_type, :disposition => 'inline'
                else 
                    send_data ApplicationHelper.profile_photo_data(request), :type => 'image/jpeg', :disposition => 'inline'
                end
            else
                send_data ApplicationHelper.profile_photo_data(request), :type => 'image/jpeg', :disposition => 'inline'
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

    end # profile_image_show

    def sign_in
        next_uri = nil 
        begin 
            init_parameters
            email = params[:email]
            password = params[:password] 
            redirect_uri = params[:redirect_uri]
            service_id = params[:service_id]
            dataToSend = nil
            @laastras_user, @email = User.authenticate(email, password, logger)
            unless session.nil?
                session[:logged_in] = false
                unless @laastras_user.nil?
                    @laastras_user.last_login = Time.now
                    @laastras_user.save
                    session[:logged_in] = true 
                    session[:user_id] = @laastras_user.id
                    dataToSend = {
                        code: 1,
                        message: (I18n.t 'logged_in_true'),
                        redirect_uri: redirect_uri
                    }
                else
                    if @email.nil? # sign up, please
                        sign_up_url = url_for(
                            controller: 'laastras',
                            action: 'sign_up'
                        )
                        if !(service_id.nil? || service_id.blank?)
                            sign_up_url = url_for(
                                controller: 'laastras',
                                action: 'sign_up',
                                service_id: service_id
                            )
                            unless (redirect_uri.nil? || redirect_uri.blank?)
                                sign_up_url = url_for(
                                    controller: 'laastras',
                                    action: 'sign_up',
                                    service_id: service_id,
                                    redirect_uri: redirect_uri
                                )
                            end
                        elsif !(redirect_uri.nil? || redirect_uri.blank?)
                            sign_up_url = url_for(
                                controller: 'laastras',
                                action: 'sign_up',
                                redirect_uri: redirect_uri
                            )
                        end
                        message = "<div><h3>#{I18n.t 'offer_to_sign_up'}</h3></div>" + 
                                    "<div>#{I18n.t 'offer_to_sign_up_message'} " + 
                                    '<a href="' + sign_up_url + '">' + (I18n.t 'here_label') + '</a>'
                        dataToSend = {
                            code: 0,
                            message: message,
                            redirect_uri: redirect_uri
                        }

                        msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + message 
                        logger.debug msg
                    else # password forgotten
                        reset_url = url_for(
                            controller: 'users', 
                            action: 'reset_password', 
                            email: URI.encode(@email)
                        )
                        message =  (I18n.t 'offer_to_reset_password_message') + 
                                    "<div><a href=\"#{reset_url}\" " + 
                                    "style=\"text-decoration: none\">" + 
                                    "#{I18n.t 'reset_label'}</a></div>"
                        dataToSend = {
                            code: 0,
                            message: message,
                            redirect_uri: redirect_uri
                        }

                        msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + message 
                        logger.debug msg
                    end
                end
            else
                dataToSend = {
                    code: 0,
                    message: (I18n.t 'logged_in_false'),
                    redirect_uri: redirect_uri
                }
            end

            # send data to caller
            render plain: JSON.generate(dataToSend) unless dataToSend.nil?
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # sign_in

    def verify_email 
        next_uri = nil
        begin 
            init_parameters
            token = params[:token]
            id = params[:id]
            redirect_uri = params[:redirect_uri]
            user = User.find(id)
            if token.nil? || token.blank? || user.nil?
                session[:fail_safe_title] = I18n.t 'no_verify_email_token_title'
                session[:fail_safe_message] = I18n.t 'no_verify_email_token_message'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
            else 
                logger.debug "Token: #{token} =? #{user.verify_email_token}"
                if token == user.verify_email_token 
                    unless user.update({verify_email_token: 'verified'})
                        msg = 'Failed to update verify email token to :verified'
                        message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        logger.debug message unless logger.nil?
                    end
                    session[:fail_safe_title] = I18n.t 'verified_email_title'
                    session[:fail_safe_message] = I18n.t 'verified_email_message'
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                else 
                    session[:fail_safe_title] = I18n.t 'unverified_email_title'
                    session[:fail_safe_message] = I18n.t 'unverified_email_message'
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                end
            end

            unless (redirect_uri.nil? || redirect_uri.blank?)
                next_uri = URI.decode(redirect_uri)
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

        if next_uri 
            redirect_to next_uri
        end

    end # verify_email

    def reset_password 
        next_uri = nil 
        begin 
            init_parameters
            id = params[:id]
            unless id.nil?
                user = User.find(id)
                if user.nil?
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                elsif( # is email verified ?
                    user.verify_email_token.nil? || 
                    user.verify_email_token.blank? || 
                    user.verify_email_token != :verified.to_s
                )
                    session[:fail_safe_message] = I18n.t 'verify_email_before_password_reset_title'
                    session[:fail_safe_message] = I18n.t 'verify_email_before_password_reset_message'
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
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
                else
                    hash = user.password
                    email = user.email 
                    reset_url = url_for(
                        controller: 'users',
                        action: 'reset_password',
                        email: URI.encode(email),
                        password: hash,
                        locale: I18n.locale.to_s
                    )
                    val = @users_helper_factory.send_reset_password_user_mail(user, reset_url)
                    unless val
                        session[:fail_safe_title] = I18n.t 'failure_to_send_reset_password_email_title'
                        session[:fail_safe_message] = (I18n.t 'failure_to_send_reset_password_email_message') + 
                                                        message
                        next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                    else
                        session[:fail_safe_title] = I18n.t 'sent_reset_password_email_title'
                        session[:fail_safe_message] = I18n.t 'sent_reset_password_email_message'
                        next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                    end
                end
            else 
                hash = params[:password]
                email = params[:email]
                if email.nil? && hash.nil?
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                elsif !(email.nil? || email.blank?) && hash.nil?
                    user = User.find_by_email(URI.decode(email))
                    if user.nil?
                        next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                    else
                        next_uri = url_for(controller: 'users', action: 'reset_password', id: user.id)
                    end
                else 
                    email = URI.decode(email)
                    user = User.find_by_email_and_password(email, hash)
                    if user.nil?
                        next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                    else 
                        next_uri = url_for(
                            controller: 'laastras',
                            action: 'sign_up',
                            reset_pwd: 'true',
                            email: URI.encode(email),
                            password: hash
                        )
                    end
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

    end # reset_password

    # POST /laastras_users/sign_up
    def sign_up 
        next_uri = nil 
        begin 
            init_parameters
            @service_id = params[:service_id] || nil
            @reset_pwd = params[:reset_pwd] || nil
            @redirect_uri = params[:redirect_uri]
            n_users = User.all.count 
            data = nil
            if n_users > ApplicationHelper.max_number_of_users 
                data = {
                    code: 0,
                    message: (I18n.t 'beyond_max_number_of_users_message')
                }
            else
                data = persist_to_database(false)
            end
            # send data to caller
            render plain: JSON.generate(data) unless data.nil?
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # sign_up

    # POST /laastras_users/update
    def update 
        next_uri = nil 
        begin
            init_parameters
            data = persist_to_database(true)
            # send data to caller
            render plain: JSON.generate(data) unless data.nil?
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # update

    def persist_to_database(updating) 
    
        dataToSend = nil

        begin
            @admin_email = 'onkezabahizi@gmail.com'
            regex_str = Regexp::escape params[:password_confirmation]
            #logger.debug "---> regex: #{regex_str}; password: #{params[:password]}"
            params[:new_password] = '' if params[:new_password].nil?
            if(
                params[:password].match?(/\A#{regex_str}\Z/) || 
                params[:new_password].match?(/\A#{regex_str}\Z/)
            )
                if @reset_pwd.nil?
                    @role = :client.to_s
                    if(params[:email].match?(/\A#{@admin_email}\Z/i))
                        @role = :admin.to_s
                    elsif params[:laastras_employee].match?(/\A(#{I18n.t 'yes_label'})\Z/i)
                        @role = :employee.to_s
                    else 
                        if @service_id.nil?
                            @role = :client.to_s
                        else
                            @role = @service_id.to_s
                        end  
                    end
                end

                @message = nil
                @sign_in_url = url_for(
                    controller: 'laastras', action: 'sign_in'
                )
                unless (@redirect_uri.nil? || @redirect_uri.blank?)
                    @sign_in_url = url_for(
                        controller: 'laastras', 
                        action: 'sign_in',
                        redirect_uri: @redirect_uri
                    )
                    #logger.debug "---> We are to sign up with redirect_uri: #{@redirect_uri}"
                end

                @sign_in_label = I18n.t 'sign_in_label'
                @contact_label = I18n.t 'contact_site_owner_label'
                @contact_url = "mailto:#{@admin_email}"

                result = false 
                if updating 
                    result = @laastras_user.update({
                        password: params[:password],
                        email: params[:email],
                        first_name: params[:first_name],
                        last_name: params[:last_name],
                        user_name: params[:user_name],
                        role: @role
                    })
                    if result
                        @message = "<div>#{I18n.t 'update_account_information_success'}</div>" + 
                                    "<div><a href=\"#{@sign_in_url}\" style=\"text-decoration: none\">" + 
                                    "#{@sign_in_label}</a></div>"
                    else 
                        @message = "<div>#{I18n.t 'update_account_information_failed'}</div>" + 
                                    "<div><a href=\"#{@contact_url}\" style=\"text-decoration: none\">" + 
                                    "#{@contact_label}</a></div>"
                    end
                else 
                    if @reset_pwd.nil?
                        @laastras_user = User.new({
                            password: params[:password],
                            email: params[:email],
                            first_name: params[:first_name],
                            last_name: params[:last_name],
                            user_name: params[:user_name],
                            role: @role
                        })
                        result = @laastras_user.save 
                        if result 
                            @message = "<div>#{I18n.t 'sign_up_success'}</div>" + 
                                    "<div><a href=\"#{@sign_in_url}\" style=\"text-decoration: none\">" + 
                                    "#{@sign_in_label}</a></div>"
                            val = @users_helper_factory.send_welcome_user_mail(@laastras_user)
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
                        else 
                            @message = "<div>#{I18n.t 'sign_up_failed'}</div>" + 
                                    "<div><a href=\"#{@contact_url}\" style=\"text-decoration: none\">" + 
                                    "#{@contact_label}</a></div>"
                        end
                    else # reset password 
                        email = URI.decode(params[:email]) 
                        password = params[:password]
                        user = User.find_by_email_and_password(email, password)
                        if user.nil? || params[:new_password].nil?
                            result = false 
                            @message = "<div>#{I18n.t 'reset_password_failed'}</div>" + 
                                        "<div><a href=\"#{@contact_url}\" style=\"text-decoration: none\">" + 
                                        "#{@contact_label}</a></div>"
                        else 
                            logger.debug "---> New password: #{params[:new_password]}\r\n" + 
                                        "---> Old password hash: #{user.password}"            
                            result = user.update({
                                password: params[:new_password]
                            })
                            if result
                                l_user = User.find_by_email(email)
                                unless l_user.nil?
                                    logger.debug "---> New password hash: #{user.password}\r\n" 
                                end

                                @message = "<div>#{I18n.t 'reset_password_success'}</div>" + 
                                            "<div><a href=\"#{@sign_in_url}\" style=\"text-decoration: none\">" + 
                                            "#{@sign_in_label}</a></div>"
                            else 
                                @message = "<div>#{I18n.t 'reset_password_failed'}</div>" + 
                                            "<div><a href=\"#{@contact_url}\" style=\"text-decoration: none\">" + 
                                            "#{@contact_label}</a></div>"
                            end
                        end
                    end
                end

                if result # Success
                    # Log them in? No.
                    # Prepare data to send back
                    dataToSend = {
                        code: 1,
                        message: @message
                    }
                else # Failed
                    msg = "\r\n#{@laastras_user.errors.count} error(s) prohibited this user from being saved:"
                    @laastras_user.errors.each do |error|
                        msg += "\r\n" + error.full_message
                    end
                    mssge = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + msg
                    logger.debug mssge

                    dataToSend = {
                        code: 0,
                        message: @message
                    }
                end
            else
                dataToSend = {
                    code: 0,
                    message: (I18n.t 'model_create_mismatch')
                }
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            dataToSend = {
                code: 0,
                message: e.message
            }
        end 

        return dataToSend

    end # persist_to_database

    # POST /laastras_users/update_profile_image?id=1
    def profile_image_update
        #logger.debug "---> PARAMS: #{params.inspect}"
        dataToSend = nil
        next_uri = nil
        begin
            init_parameters
            if params[:file].nil?
                dataToSend = {
                    code: 0,
                    message: (I18n.t 'profile_photo_absent')
                }
            else
                # Photo
                photo_data = store_profile_photo(params) 
                raise 'Something went wrong saving profile photo' if photo_data.nil?
                
                if photo_data.empty? 
                    dataToSend = {
                        code: 0,
                        message: (I18n.t 'beyond_max_profile_photo_size_message')
                    }
                else

                    unless @laastras_user.nil?
                        unless (
                            @laastras_user.photo_uri.nil? || 
                            @laastras_user.photo_uri.blank?
                        )
                            if File.exists? @laastras_user.photo_uri
                                File.delete(@laastras_user.photo_uri) 
                            end
                        end
                        if @laastras_user.update({
                            photo_uri: photo_data[:photo_full_path],
                            photo_mime_type: photo_data[:photo_mime_type]
                        })
                            dataToSend = {
                                code: 1,
                                message: (I18n.t 'profile_photo_create_success')
                            }
                        else 
                            dataToSend = {
                                code: 0,
                                message: (I18n.t 'profile_photo_update_failure')
                            }
                        end
                    else
                        dataToSend = {
                            code: 0,
                            message: (I18n.t 'profile_photo_user_absent')
                        }
                    end 
                end
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            dataToSend = {
                code: 0,
                message: e.message
            }
        end

        if next_uri 
            redirect_to next_uri
        end

        # send data to caller
        render plain: JSON.generate(dataToSend) unless dataToSend.nil?

    end # profile_image_update

    def init_parameters 
        next_uri = nil 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.set_locale_from_request(request, logger)
            ApplicationHelper.harvest_analytics(session, request)
            @site_title = "Laastras | #{params[:action]}"
            @header_data = ApplicationHelper::SiteHeaderData.new(request, logger)
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

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_laastras_user
            next_uri = nil 
            begin
                user = ApplicationHelper.who_is_logged_in?(session)
                unless user.nil? 
                    unless ApplicationHelper.user_has_admin_role?(session)
                        @laastras_user = user
                    else 
                        @laastras_user = User.find(params[:id])
                    end
                    init_parameters
                else 
                    redirect_to controller: 'laastras', action: 'home'
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

        end # set_laastras_user

        def store_profile_photo(req_params)
            photo_data = nil 
            begin 
                filename = req_params[:file][:uploaded_profile_photo_file].original_filename
                fname = ApplicationHelper.unique_file_name(filename, logger)
                raise "Failed to generate unique name for file: #{filename}" if (fname.nil? || fname.blank?)
                photo_full_path = ApplicationHelper.user_profile_photo_asset_url(fname)
                photo_mime_type = req_params[:file][:uploaded_profile_photo_file].content_type 
                data = req_params[:file][:uploaded_profile_photo_file].read
                size = data.size 
                if size > ApplicationHelper.max_profile_photo_size
                    photo_data = {}
                else 
                    begin
                        File.open(photo_full_path, "wb"){|io| io.write(data)}
                    rescue Exception => e
                        message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + e.message 
                        logger.debug message unless logger.nil?
                    end

                    photo_data = {
                        photo_full_path: photo_full_path,
                        photo_mime_type: photo_mime_type
                    }
                end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                        __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
            end 

            photo_data

        end # store_profile_photo

        # Only allow a list of trusted parameters through.
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name, :user_name, :role, :password, :password_confirmation)
        end
    end
