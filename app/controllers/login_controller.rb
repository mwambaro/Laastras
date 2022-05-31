class LoginController < ApplicationController
    before_action :init_parameters

    def index
        @user = ApplicationHelper.who_is_logged_in?(session)
        unless @user.nil? 
            respond_to do |format|
                format.html { redirect_to @user, notice: (I18n.t 'logged_in_true') }
                format.json { render :show, status: :ok, location: @user }
            end
        end
    end

    def logout
        ApplicationHelper.logout_user(session)
        redirect_to controller: 'laastras', action: 'home'
    end

    def check_credentials
        email = params[:email]
        password = params[:password] 
        dataToSend = nil
        @user = User.authenticate(email, password)
        unless session.nil?
            session[:logged_in] = false
            unless @user.nil?
                @user.last_login = Time.now
                @user.save
                session[:logged_in] = true 
                session[:user_id] = @user.id
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
        render plain: JSON.generate(dataToSend) if(!dataToSend.nil?)
    end

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
        @headerData = ApplicationHelper::SiteHeaderData.new(request)
        @action_name = params[:action].nil? ? '' : params[:action]
        @copy_right = "#{Time.now.year} #{I18n.t 'copy_right'}."
        @laastras_actions = @headerData.laastras_actions
        unless ApplicationHelper.who_is_logged_in?(session).nil?
            @laastras_actions << {
                url: url_for(controller: 'login', action: 'logout'),
                inner_text: (I18n.t 'logout_label'),
                dropdown_boolean: 'false',
                data: ''
            }
        end

        @footer_actions = @headerData.footer_actions
        @social_media_data = @headerData.social_media_data
        @supported_languages = @headerData.supported_languages

        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
        @logo_image_url = ApplicationHelper.image_asset_url(
            request, 'Logo-03.svg'
        )
    end
end
