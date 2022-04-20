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
    
    # POST /users/sign_up
    def sign_up 
        init_parameters
        
        dataToSend = nil

        begin
            if params[:password].match?(/\A#{params[:password_confirmation]}\Z/)
                @user = User.new({
                    password: params[:password],
                    email: params[:email],
                    first_name: params[:first_name],
                    last_name: params[:last_name]
                })
                if(@user.email.match?(/\Aonkezabahizi@gmail.com\Z/i))
                    @user.role = 'Admin'
                else 
                    @user.role = 'Client'
                end

                if @user.save # Success
                    # Log them in? No.
                    # Prepare data to send back
                    dataToSend = {
                        code: 1,
                        message: (I18n.t 'model_create_success')
                    }
                else # Failed
                    msg = "#{@user.errors.count} error(s) prohibited this user from being saved:"
                    msg += "<ul>"
                    @user.errors.each do |error|
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

        # send data to caller
        render plain: JSON.generate(dataToSend) if(!dataToSend.nil?)
    end

    # POST /users or /users.json
    def create
        @user = User.new(site_language_params)

        respond_to do |format|
            if @user.save
                format.html { redirect_to @site_language, notice: "User was successfully created." }
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
        ApplicationHelper.set_user_set_locale(session)
        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
            begin 
                @user = User.find(params[:id])
                init_parameters
            rescue Exception => e 
            end
        end

        # Only allow a list of trusted parameters through.
        def user_params
            params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
        end
    end
