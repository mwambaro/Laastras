require "rails_helper"

RSpec.feature "Users", :type => :feature do

    before do 
        @submit_str = I18n.t 'submit_label'
        @email = 'example@laastras.bi'
        @password = '#4567890p#%*&'
    end

    scenario 'creates a new user' do
        first_name = 'Obed-Edom'
        last_name = 'Nkezabahizi'
        user_name = 'Mwambaro'

        visit '/laastras/sign_up'
        within find('#laastras-user-sign-up-form') do 
            fill_in 'email', with: @email
            fill_in 'first_name', with: first_name
            fill_in 'last_name', with: last_name
            fill_in 'user_name', with: user_name
            fill_in 'password', with: @password
            fill_in 'password_confirmation', with: @password

            click_button @submit_str
        end

        val = nil 
        success_message = I18n.t 'model_create_success'
        actual_message = nil
        while val.nil?
            val = page.execute_script("let par = document.getElementById('verbose-p'); if(par){ return par.innerHTML;}")
            actual_message = val.gsub(/(\A\s+)|(\s+\Z)/, '') unless val.nil?
        end

        puts "SCRIPT: #{actual_message}"
        expect(actual_message).to eq(success_message)

        sql = "SELECT * FROM users WHERE email = '#{@email}' AND first_name = '#{first_name}' AND last_name = '#{last_name}'"
        users = User.find_by_sql(sql)
        expect(users.count).to eq(1)
    end

    scenario 'signs user in successfully' do
        visit '/laastras/sign_in'
        within find('#laastras-user-sign-in-form') do 
            fill_in 'email', with: @email
            fill_in 'password', with: @password

            click_button @submit_str
        end

        val = nil 
        success_message = I18n.t 'logged_in_true'
        actual_message = nil
        while val.nil?
            val = page.execute_script("let par = document.getElementById('verbose-p'); if(par){ return par.innerHTML;}")
            actual_message = val.gsub(/(\A\s+)|(\s+\Z)/, '') unless val.nil?
        end

        puts "SCRIPT: #{actual_message}"
        expect(actual_message).to eq(success_message)
    end
end

RSpec.describe LaastrasController do
    describe 'GET #home' do
        it 'should return OK' do
            get :home
            expect(response).to have_http_status(:success)
        end
    end
end