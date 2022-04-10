class UsersController < ApplicationController
    before_action :set_user, only: %i[ show edit update destroy ]

    # GET /users or /users.json
    def index
        init_parameters
        if ApplicationHelper.user_has_admin_role?(session)
            @users = User.all
        else 
            redirect_to controller: 'laastras', action: 'home'
        end
    end

    # GET /users/1 or /users/1.json
    def show
        user = ApplicationHelper.who_is_logged_in?(session)
        unless user.nil? 
            unless ApplicationHelper.user_has_admin_role?(session)
                @user = user
            end
        else 
            redirect_to controller: 'laastras', action: 'home'
        end
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
        init_parameters

        if user_params[:password].match?(/\A#{user_params[:password_confirmation]}\Z/)
            params = {
                password: user_params[:password],
                email: user_params[:email],
                first_name: user_params[:first_name],
                last_name: user_params[:last_name]
            }
            @user = User.new(params)
            if(@user.email.match?(/\Aonkezabahizi@gmail.com\Z/i))
                @user.role = 'Admin'
            else 
                @user.role = 'Client'
            end

            respond_to do |format|
                if @user.save
                    format.html { redirect_to @user, notice: (I18n.t 'model_create_success') }
                    format.json { render :show, status: :created, location: @user }
                else
                    format.html { render :new, status: :unprocessable_entity }
                    format.json { render json: @user.errors, status: :unprocessable_entity }
                end
            end
        else
            respond_to do |format|
                format.html { redirect_to controller: 'users', action: 'new', notice: (I18n.t 'model_create_mismatch') }
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
        ApplicationHelper.set_user_set_locale(session)
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
            params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
        end
    end
