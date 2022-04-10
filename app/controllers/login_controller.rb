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
        redirect_to :back
    end

    def check_credentials
        email = params[:login][:email]
        password = params[:login][:password] 
        @user = User.authenticate(email, password)
        unless session.nil?
            session[:logged_in] = false
            respond_to do |format|
                unless @user.nil?
                    @user.last_login = Time.now
                    @user.save
                    session[:logged_in] = true 
                    session[:user_id] = @user.id
                    format.html { redirect_to @user, notice: (I18n.t 'logged_in_true') }
                    format.json { render :show, status: :ok, location: @user }
                else
                    @notice = (I18n.t 'logged_in_false')
                    format.html { redirect_to action: 'index', notice: @notice }
                end
            end
        end
    end

    def init_parameters 
        ApplicationHelper.set_user_set_locale(session)
        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
    end
end
