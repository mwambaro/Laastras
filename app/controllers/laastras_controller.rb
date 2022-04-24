require 'json'
require 'core_ext/string'

class LaastrasController < ApplicationController
    before_action :init_parameters, :corb_disable

    def home
    end

    def services
    end

    def hire_us
        @hire_us_carousel_milestones_image_data = [
            {
                url: @hire_us_solutions_architect_img_url,
                description: (I18n.t 'hire_us_software_solutions_architect')
            },
            {
                url: @hire_us_software_engineer_img_url,
                description: (I18n.t 'hire_us_cross_platform_software_engineer')
            },
            {
                url: @hire_us_project_manager_img_url,
                description: (I18n.t 'hire_us_software_project_manager')
            },
            {
                url: @hire_us_laas_leader_img_url,
                description: (I18n.t 'hire_us_laas_leader')
            }
        ]
        @hire_us_carousel_section_title = (I18n.t 'hire_us_label')
    end

    def donate
    end

    def sign_in
        redirect_to :controller => 'login', :action => 'index'
    end

    def sign_up
        redirect_to :controller => 'users', :action => 'new'
    end

    # See https://gist.github.com/mlanett/a31c340b132ddefa9cca
    # for HTTP status codes and symbols.
    def locale
        lc = params[:locale]
        lchash = nil
        data = nil
        options = {
            type: :json,
            disposition: 'inline',
            status: (Rack::Utils::SYMBOL_TO_STATUS_CODE[:ok])
        }

        begin

            if(lc.nil?)
      
            data = {
                code: '0',
                message: (I18n.t 'locale_set_no_locale_settings').paragraphize
            }
            #options[:status] = Rack::Utils::SYMBOL_TO_STATUS_CODE[:bad_request]

            else
                lchash = JSON.parse(lc)
                if(!lchash['locale'].blank?)
                    I18n.locale = lchash['locale'].to_sym
                    data = {
                        code: '1',
                        message: ((I18n.t 'locale_set_success').paragraphize + 
                                  ": #{lchash['language']} (#{lchash['country']})")
                    }
                    # fill cookies and create Active language record
                    handle_cookies(I18n.locale)
                else
                    data = {
                        code: '0',
                        message: ((I18n.t 'locale_set_failure').paragraphize + 
                                  ": #{lchash['language']} (#{lchash['country']})")
                    }
                    #options[:status] = Rack::Utils::SYMBOL_TO_STATUS_CODE[:not_acceptable]
                end
            end

        rescue I18n::InvalidLocale

            message = (I18n.t 'locale_set_failure').paragraphize
            if(!lchash.nil?)
                message += ": #{lchash['language']} (#{lchash['country']})"
            end

            data = {
                code: 0,
                message: message             
            }

        rescue Exception => e

            data = {
                code: 0,
                message: e.message
            }

        end
        # send data to caller
        render plain: JSON.generate(data) if(!data.nil?)
    end

    def terms_of_use
    
    end

    def privacy
    
    end

    def cookies
    
    end

    def about
    
    end

    def contact
    end

    def web_stats 
        @web_statistics = ApplicationHelper.web_stats_code
    end

    def init_parameters
        ApplicationHelper.set_user_set_locale(session)
        @headerData = ApplicationHelper::SiteHeaderData.new(request)
        @cache_store = Laastras::Application.config.action_controller.cache_store
        @action_name = params[:action].nil? ? '' : params[:action]
        @open_graph_proto_description = I18n.t 'opg_site_meta_description'
        @open_graph_proto_title = I18n.t 'opg_site_meta_title'
        @kick_off = I18n.t 'kick_off'
        @tap_click_image = I18n.t 'click_or_tap_image_text'
        @mission = I18n.t 'mission'
        @vision = I18n.t 'vision'
        @home_label = I18n.t 'home_label'
        @cookies_policy_body_text = I18n.t 'cookies_policy_body_text'
        @privacy_policy_body_text = I18n.t 'privacy_policy_body_text'
        @about_our_mission_body_text = I18n.t 'laastras_mission_terms_description'
        @terms_of_use_body_text = I18n.t 'terms_of_use_body_text'
        @site_description = I18n.t 'site_meta_description'
        @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
        @contact_us_email_link = 'mailto:onkezabahizi@gmail.com'
        @work_in_progress_label = I18n.t 'work_in_progress_label'
        @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
        @work_in_progress_description = I18n.t 'work_in_progress_description'
        @site_title = 'Laastras | ' + @action_name
        @hire_us_software_solutions_architect = (I18n.t 'hire_us_software_solutions_architect')
        @hire_us_cross_platform_software_engineer = (I18n.t 'hire_us_cross_platform_software_engineer')
        @hire_us_software_project_manager = (I18n.t 'hire_us_software_project_manager')
        @hire_us_laas_leader = (I18n.t 'hire_us_laas_leader')
        @hire_us_contact_string = I18n.t 'contact_us'
        @hire_us_email = 'onkezabahizi@gmail.com'
        @hire_us_solutions_architect_img_url = 'https://am3pap006files.storage.live.com/y4mwskT2q4ZgXD1irXGA_xPIVIZsb--D3xw49lo1x_5k2bKQ76xsdum-MdE5lFMlRSwXSCcaSh-80-hsLRlrXXhK3sJsYdRaBXwNRp_5-5N0UuEfpnTqVuwkcEZNu1HR2qqCIHHPZJ_MU-mxOx1nFdC7Tx0nsPsybeAB4LTAjYiU-zPBsmdw6A_lwKllhMAysts?width=2039&height=1493&cropmode=none'
        @hire_us_software_engineer_img_url = 'https://am3pap006files.storage.live.com/y4mhHyrSJhoBQWPjClAp7I4E9fIE2cW0hKxyc0SxtcYir29h4jAqUHKV-q9_IuCXeFTVDjshOHYCpOp_tSAKwsgbADmucy_wu6_sKnNGQITarG0sx4U-YRiA900RfOQmOKBXh7fgxPQf3IAY8lWlRaTPieHaWEVcUNJKSTuZoI1BzgL9LMkWIY8A2vwYBcq5e2S?width=1345&height=633&cropmode=none'
        @hire_us_project_manager_img_url = 'https://am3pap006files.storage.live.com/y4mVfrEMzWBkglexn__TISejwsZ1bkj3iEtLbcorFTCwpIXvaV5Y3jgplxX89u2ma5jk6ZKr6mdnTN8uh6Q92SVIsqikBxOUxWSGHb_-ZfT6jPxWH1Vl-PisYr5OqcVvl4GC-0jPQLX138gbSYauG6nQ1ERQ_RdR-U2GGyazgeJfhVjjojlU9OSuExGn4zRHfbp?width=2038&height=1558&cropmode=none'
        @hire_us_laas_leader_img_url = 'https://am3pap006files.storage.live.com/y4mifbCvsJK2o8wgIV3PwP4Zn_eEu4976Y9BnPdfDeuIAibBA0wH43bf_gVNWLTHgvOTm8YEnNf0RKmrIqg378mado77VKR-f8VOLyG4qVmAEIgOxI2Ln99dOqk5X53j7knt7VlN0zuUmY4V-PnIchaosoJ1xYKnYW9R16OKaRlMFdIgtQiiM6Lj6o2ksHh5GfR?width=609&height=410&cropmode=none'
        @mission_kick_off_data = [
            {
                url: (I18n.t 'laastras_kick_off_with_yoola_url'),
                description: (I18n.t 'laastras_kick_off_with_yoola_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_kick_off_with_aori_url'),
                description: (I18n.t 'laastras_kick_off_with_aori_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_aori_for_policy_makers_url'),
                description: (I18n.t 'laastras_aori_for_policy_makers_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_mission_terms_url'),
                description: (I18n.t 'laastras_mission_terms_description').paragraphize
            },
            {
                url: (I18n.t 'homefinances_dfd_url'),
                description: (I18n.t 'homefinances_dfd_description').paragraphize
            },
            {
                url: (I18n.t 'b2c_to_homefinances_dfd_url'),
                description: (I18n.t 'b2c_to_homefinances_dfd_description').paragraphize
            },
            {
                url: (I18n.t 'logistics_ecommerce_for_scops_url'),
                description: (I18n.t 'logistics_ecommerce_for_scops_description').paragraphize
            },
            {
                url: (I18n.t 'standardization_and_praas_url'),
                description: (I18n.t 'standardization_and_praas_description').paragraphize
            },
            {
                url: (I18n.t 'farming_storage_and_transformation_url'),
                description: (I18n.t 'farming_storage_and_transformation_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_lobbying_url'),
                description: (I18n.t 'laastras_lobbying_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_humanitarianism_url'),
                description: (I18n.t 'laastras_humanitarianism_description').paragraphize
            },
            {
                url: (I18n.t 'laastras_globalization_url'),
                description: (I18n.t 'laastras_globalization_description').paragraphize
            }
        ]
        @copy_right = "#{Time.now.year} #{I18n.t 'copy_right'}."
        @laastras_services = @headerData.laastras_services
        @laastras_actions = @headerData.laastras_actions
        unless ApplicationHelper.who_is_logged_in?(session).nil?
            @laastras_actions << {
                url: url_for(controller: 'login', action: 'logout'),
                inner_text: (I18n.t 'logout_label'),
                dropdown_boolean: 'false',
                data: ''
            }
        end

        @footer_actions = @headerData.footer_actions
        @social_media_data = @headerData.social_media_data
        @laastras_sample_services = [
            (I18n.t 'iot'),
            (I18n.t 'means_of_exchange'),
            (I18n.t 'equality_policy'),
            (I18n.t 'logistics_ecommerce'),
            (I18n.t 'aori_globalization')
        ]
        @globalization_intro = (I18n.t 'mission_terms').paragraphize
        @laastras_vision = (I18n.t 'vision_terms')
        @supported_languages = @headerData.supported_languages

        #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
        @site_background_image_url = ApplicationHelper.image_asset_url(
            request, '838457-default-background-image.jpg'
        )
        @logo_image_url = ApplicationHelper.image_asset_url(
            request, 'Logo-03.svg'
        )
    end

    def handle_cookies(locale)
        # use cookies hash
        ip = request.remote_ip
        browser = request.user_agent
        cookies_value = "#{locale.to_s}##{ip}##{browser}"
        #if(!session.nil?)
            session[:user_cookies] = cookies_value
        #end

        @active_language = SiteLanguage.new(
            :user_session => cookies_value,
            :language => I18n.locale.to_s,
            :user_ip => ip,
            :user_browser => browser
        )
        @active_language.save
    end

    def corb_disable
        response.headers.merge!(
            'Access-Control-Allow-Origin' => request.headers['Origin'].presence || '',
            'Access-Control-Allow-Credentials' => 'true',
        )

        if request.method_symbol == :options
            response.headers.delete('X-Content-Type-Options') ## THIS IS THE IMPORTANT BIT
            response.headers.merge!(
                'Access-Control-Allow-Methods' => 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' => request.headers['Access-Control-Request-Headers'].presence || 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Max-Age' => 14.days.to_s
            )
        end
    end
end
