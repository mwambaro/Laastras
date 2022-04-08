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
    end
end
