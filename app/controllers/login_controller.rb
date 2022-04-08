class LoginController < ApplicationController
    def index
    end

    def logout
    end

    def check_credentials
        email = params[:login][:email]
        password = params[:login][:password] 
        user = User.authenticate(email, password)
        redirect_to :action => 'index', notice: "Logged in OK? " + (!(user.nil?)).to_s
    end
end
