class UsersController < ApplicationController
    before_action :set_laastras_user, only: %i[ show edit update destroy profile_image_show profile_image_update ]

    def index
        if ApplicationHelper.user_has_admin_role?(session)
            init_parameters
            @laastras_users = User.all
        else 
            redirect_to controller: 'laastras', action: 'home'
        end
    end

    def show
        @view_mode = false.to_s
        @full_name = "#{@laastras_user.first_name} #{@laastras_user.last_name}"
        @role = I18n.t @laastras_user.role 
        @email = @laastras_user.email
    end

    def edit 
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
                redirect_to controller: 'laastras', action: 'home'
            end
        else
            redirect_to controller: 'laastras', action: 'home'
        end
    end # edit

    def destroy 
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
                            redirect_to controller: 'laastras', action: 'home'
                        else
                            redirect_to params[:redirect_uri]
                        end
                    end
                end
            else
                redirect_to controller: 'laastras', action: 'home'
            end
        else
            redirect_to controller: 'laastras', action: 'home'
        end
    end # destroy

    # GET /laastras_users/profile_image_show?id=1
    def profile_image_show
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
    end

    def sign_in
        email = params[:email]
        password = params[:password] 
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
                    message: (I18n.t 'logged_in_true')
                }
            else
                dataToSend = {
                    code: 0,
                    message: (I18n.t 'logged_in_false')
                }
            end
        else
            dataToSend = {
                code: 0,
                message: (I18n.t 'logged_in_false')
            }
        end

        # send data to caller
        render plain: JSON.generate(dataToSend) unless dataToSend.nil?
    end

    # POST /laastras_users/sign_up
    def sign_up 
        data = persist_to_database(false)
        # send data to caller
        render plain: JSON.generate(data) unless data.nil?

    end # sign_up

    # POST /laastras_users/update
    def update 
        data = persist_to_database(true)
        # send data to caller
        render plain: JSON.generate(data) unless data.nil?

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
            dataToSend = {
                code: 0,
                message: e.message
            }
        end

        # send data to caller
        render plain: JSON.generate(dataToSend) unless dataToSend.nil?

    end # profile_image_update

    def init_parameters 
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
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_laastras_user
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
        end

        # Only allow a list of trusted parameters through.
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name, :user_name, :role, :password, :password_confirmation)
        end
    end
