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
        ApplicationHelper.set_user_set_locale(session)
        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
    end
end
