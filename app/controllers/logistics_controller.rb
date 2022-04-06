require 'json'
require 'core_ext/string'

class LogisticsController < ApplicationController
    before_action :init_parameters

    def shipment_service
    end

    def bus_service
    end

    def cab_service
    end

    def bike_service
    end

    def init_parameters
        @cache_store = Laastras::Application.config.action_controller.cache_store
        @home_label = I18n.t 'home_label'
        @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
        @work_in_progress_label = I18n.t 'work_in_progress_label'
        @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
        @work_in_progress_description = I18n.t 'work_in_progress_description'
        data = nil
        begin
            if(!cookies.nil?)
                @active_language = SiteLanguage.first(:user_session => cookies[:user_cookies])
                I18n.locale = @active_language.nil? ? I18n.locale : @active_language[:language].to_sym
            end
        rescue Exception => e

            data = {
                code: 0,
                message: e.message
            }

        end
    end
end
