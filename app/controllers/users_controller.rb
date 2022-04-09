class UsersController < ApplicationController
    before_action :set_user, only: %i[ show edit update destroy ]

    # GET /users or /users.json
    def index
        @users = User.all
        init_parameters
    end

    # GET /users/1 or /users/1.json
    def show
    end

    # GET /users/new
    def new
        @user = User.new
        init_parameters
    end

    # GET /users/1/edit
    def edit
    end

    # POST /users or /users.json
    def create
        @user = User.new(user_params)

        respond_to do |format|
            if @user.save
                format.html { redirect_to @user, notice: (I18n.t 'model_create_success') }
                format.json { render :show, status: :created, location: @user }
            else
                format.html { render :new, status: :unprocessable_entity }
                format.json { render json: @user.errors, status: :unprocessable_entity }
            end
        end
    end

    # PATCH/PUT /users/1 or /users/1.json
    def update
        respond_to do |format|
            if @user.update(user_params)
                format.html { redirect_to @user, notice: (I18n.t 'model_update_success') }
                format.json { render :show, status: :ok, location: @user }
            else
                format.html { render :edit, status: :unprocessable_entity }
                format.json { render json: @user.errors, status: :unprocessable_entity }
            end
        end
    end

    # DELETE /users/1 or /users/1.json
    def destroy
        @user.destroy
        respond_to do |format|
            format.html { redirect_to users_url, notice: (I18n.t 'model_destroy_success') }
            format.json { head :no_content }
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

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
            @user = User.find(params[:id])
            init_parameters
        end

        # Only allow a list of trusted parameters through.
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name, :password)
        end
    end
