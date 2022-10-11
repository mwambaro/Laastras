class UsersController < ApplicationController
    before_action :set_laastras_user, only: %i[ show edit update destroy profile_image_show profile_image_update ]

    def index
        next_uri = nil 
        begin 
            if ApplicationHelper.user_has_admin_role?(session)
                init_parameters
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
            @view_mode = false.to_s
            @full_name = "#{@laastras_user.first_name} #{@laastras_user.last_name}"
            @role = I18n.t @laastras_user.role 
            @email = @laastras_user.email
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
                            ApplicationHelper.logout_user(session)
                            @laastras_user.destroy!
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
                unless @laastras_user.photo.nil?
                    send_data @laastras_user.photo, :type => 'image/jpeg', :disposition => 'inline'
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
            email = params[:email]
            password = params[:password] 
            redirect_uri = params[:redirect_uri]
            dataToSend = nil
            @laastras_user = User.authenticate(email, password)
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
                    dataToSend = {
                        code: 0,
                        message: (I18n.t 'logged_in_false'),
                        redirect_uri: redirect_uri
                    }
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

    # POST /laastras_users/sign_up
    def sign_up 
        next_uri = nil 
        begin 
            data = persist_to_database(false)
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
        init_parameters
    
        dataToSend = nil

        begin
            admin_email = 'onkezabahizi@gmail.com'
            regex_str = Regexp::escape params[:password_confirmation]
            logger.debug 'REGEX: ' + regex_str
            if params[:password].match?(/\A#{regex_str}\Z/)
                role = 'Client'
                if(params[:email].match?(/\A#{admin_email}\Z/i))
                    role = 'Admin'
                else 
                    if params[:laastras_employee].match?(/\A(#{I18n.t 'yes_label'})\Z/i)
                        role = 'Employee'
                    else
                        role = 'Client'
                    end
                end

                result = false 
                if updating 
                    result = @laastras_user.update({
                        password: params[:password],
                        email: params[:email],
                        first_name: params[:first_name],
                        last_name: params[:last_name],
                        user_name: params[:user_name],
                        role: role
                    })
                else 
                    @laastras_user = User.new({
                        password: params[:password],
                        email: params[:email],
                        first_name: params[:first_name],
                        last_name: params[:last_name],
                        user_name: params[:user_name],
                        role: role
                    })
                    result = @laastras_user.save
                end

                if result # Success
                    # Log them in? No.
                    # Prepare data to send back
                    dataToSend = {
                        code: 1,
                        message: (I18n.t 'model_create_success')
                    }
                else # Failed
                    msg = "#{@laastras_user.errors.count} error(s) prohibited this user from being saved:"
                    msg += "<ul>"
                    @laastras_user.errors.each do |error|
                        msg += "<li>" + error.full_message + "</li>"
                    end
                    msg += "</ul>"
                    dataToSend = {
                        code: 0,
                        message: msg
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
        logger.debug "---> PARAMS: #{params.inspect}"
        dataToSend = nil
        begin
            if params[:file].nil?
                dataToSend = {
                    code: 0,
                    message: (I18n.t 'profile_photo_absent')
                }
            else
                data = params[:file][:uploaded_profile_photo_file].read
                unless @laastras_user.nil?
                    if @laastras_user.update({photo: data})
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
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            dataToSend = {
                code: 0,
                message: e.message
            }
        end

        # send data to caller
        render plain: JSON.generate(dataToSend) unless dataToSend.nil?

    end # profile_image_update

    def init_parameters 
        next_uri = nil 
        begin
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.harvest_analytics(session, request)
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

        # Only allow a list of trusted parameters through.
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name, :user_name, :role, :password, :password_confirmation)
        end
    end
