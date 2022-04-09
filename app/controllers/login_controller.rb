class LoginController < ApplicationController
    before_action :init_parameters
    
    def index
    end

    def logout
    end

    def check_credentials
        email = params[:login][:email]
        password = params[:login][:password] 
        @user = User.authenticate(email, password)
        respond_to do |format|
            if !@user.nil?
                format.html { redirect_to @user, notice: "Logged in OK? True" }
                format.json { render :show, status: :ok, location: @user }
            else
                format.html { redirect_to :controller => 'users', :action => 'new', notice: "Logged in OK? False" }
            end
        end
    end

    def init_parameters 
        if(!session.nil?)
            sql_query = "SELECT * FROM site_languages WHERE user_session = '#{session[:user_cookies]}'"
            active_language = SiteLanguage.find_by_sql(sql_query)
            if(!active_language.nil?)
                lang = active_language[0]
                if(!lang.nil?)
                    language = lang[:language]
                    if(!language.nil?)
                        I18n.locale = language.to_sym
                    end
                end
            end
        end
        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
    end
end
