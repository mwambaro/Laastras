
include ActionView::Helpers::AssetUrlHelper
require 'net/http'

module ApplicationHelper
    def self.harvest_analytics(session, request)
        user_id = nil
        user = self.who_is_logged_in?(session)
        user_id = user.id unless user.nil?
        session_string = session[:session_id]
        ip_address = request.remote_ip
        user_agent = request.user_agent 
        referer = request.referer
        request_url = request.original_url
                        .gsub(/http(s)*:\/\//i, '')
                        .gsub(/obem_main\/home/i, '')
                        .gsub(/(\A\s+)|(\s+\Z)/, '')
                        .split(/[\?\#]/)[0]
        LaastrasPageView.new({
            user_id: user_id,
            session: session_string,
            ip_address: ip_address,
            request_url: request_url,
            user_agent: user_agent,
            referer: referer
        }).save

    end # harvest_analytics

    def self.profile_photo_data(request)
        data = URI.open(
            ApplicationHelper.image_asset_url(
                request, 'profile_photo.JPG'
            )
        ){ |io| io.read }

    end # profile_photo_data

    def self.set_locale(params, session)
        lc = params[:locale]
        lchash = nil
        data = nil

        begin

            if(lc.nil?)
      
            data = {
                code: '0',
                message: (I18n.t 'locale_set_no_locale_settings').paragraphize
            }

            else
                lchash = JSON.parse(lc)
                if(!lchash['locale'].blank?)
                    I18n.locale = lchash['locale'].to_sym
                    data = {
                        code: '1',
                        message: ((I18n.t 'locale_set_success').paragraphize + 
                                  ": #{lchash['language']} (#{lchash['country']})")
                    }
                    # fill it in session
                    session[:active_language] = I18n.locale.to_s unless session.nil?
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
        # return data to caller
        data

    end # set_locale

    def self.http_get(url_link, custom_headers=nil, logger=nil)
        res = nil 
        begin
            url = URI.parse(url_link)
            req = Net::HTTP::Get.new(url.to_s)
            unless custom_headers.nil?
                custom_headers.keys.each do |key|
                    value = custom_headers[key]
                    req[key.to_s] = value if !value.nil? && !value.blank?
                end
            end
            res = Net::HTTP.start(url.host, url.port, :use_ssl => url.scheme == 'https') do |http|
                http.request(req)
            end
        rescue Exception => e 
            unless logger.nil?
                logger.debug "ApplicationHelper.http_get: #{e.message}"
            end
        end
        res
    end

    def self.http_post(url_link, custom_headers=nil, body=nil, logger=nil)
        res = nil
        begin
            uri = URI.parse(url_link)
            req = Net::HTTP.new(uri.host, uri.port)
            req.use_ssl = true
            headers = {
                "Content-Type" => "application/json", 
                "Accept" => "application/json"
            }
            unless custom_headers.nil?
                headers.merge!(custom_headers)
            end
            unless body.nil?
                res = req.post(uri, body.to_json, headers)
            end
        rescue Exception => e 
            unless logger.nil?
                logger.debug "ApplicationHelper.http_get: #{e.message}"
            end
        end
        res
    end

    def self.web_stats_code
        code =<<-HERE
            <!-- Begin Web-Stat code v 7.0 -->
            <span id="wts2055125"></span>
            <script>
                var wts=document.createElement('script');
                wts.async=true;
                wts.src='https://app.wts2.one/log7.js';
                document.head.appendChild(wts);
                wts.onload = function()
                { 
                    wtslog7(2055125,3); 
                };
            </script>
            <noscript>
                <a href="https://www.web-stat.com">
                    <img src="https://app.wts2.one/7/3/2055125.png" alt="Web-Stat analytics">
                </a>
            </noscript>
            <!-- End Web-Stat code v 7.0 -->
        HERE
    end

    # <summary>
    #   Emulates the url_for method.
    # </summar>
    # <param name="options"> A hash including :controller and :action </param>
    def self.emulate_url_for(options)
        url = "/#{options[:controller]}/#{options[:action]}"
    end
    

    def self.image_asset_url(request, file)
        request.protocol + request.host_with_port + path_to_image(file)
    end
    
    # <summary>
    #       Given a user session, has the user set any particular language settings? If so, retrieve
    #       them from the session object. So you should know which key of the session hash to use.
    # </summary>
    # <param name="session"> The Rails session object </param>
    def self.set_user_set_locale(session)
        unless session.nil?
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

    # <summary>
    #       Given a user session, if the user is logged in, is the user ADMIN?
    # </summary>
    # <param name="session"> The Rails session object. You should know what you stored there. </param>
    def self.user_has_admin_role?(session)
        admin = false

        unless session.nil?
            if session[:logged_in]
                sql_query = "SELECT * FROM users WHERE id = #{session[:user_id]}"
                user = User.find_by_sql(sql_query)
                unless user.nil?
                    unless user[0].role.nil?
                        admin = user[0].role.match?(/\AAdmin\Z/i)
                    end
                end
            end
        end

        admin
    end

    # <summary>
    #       Given session object, find the user who is logged in.
    # </summary>
    # <param name="session"> The Rails session object. We assume you know what to look for in it. </param>
    # <returns> The logged in user, if any, or nil </returns>
    def self.who_is_logged_in?(session)
        user = nil

        unless session.nil?
            if session[:logged_in]
                sql_query = "SELECT * FROM users WHERE id = #{session[:user_id]}"
                us = User.find_by_sql(sql_query)
                unless us.nil?
                    user = us[0]
                end
            end
        end

        user
    end

    def self.logout_user(session)
        unless session.nil?
            session[:user_id] = nil
            session[:logged_in] = false
        end
    end

    # Site header data
    class SiteHeaderData < ApplicationController
        def initialize(rqst)
            @request = rqst
            self.request = @request
        end

        def laastras_actions
            [
                {
                    url: url_for(controller: 'laastras', action: 'hire_us'),
                    inner_text: (I18n.t 'hire_us_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: '',
                    inner_text: (I18n.t 'services_label'),
                    dropdown_boolean: 'true',
                    data: self.laastras_services
                },
                {
                    url: url_for(controller: 'laastras', action: 'donate'),
                    inner_text: (I18n.t 'donate_label'),
                    dropdown_boolean: 'false',
                    data: ''
                }
            ]
        end

        def footer_actions
            [
                {
                    url: url_for(controller: 'laastras', action: 'about'),
                    inner_text: (I18n.t 'about')
                },
                {
                    url: url_for(controller: 'laastras', action: 'terms_of_use'),
                    inner_text: (I18n.t 'terms_of_use')
                },
                {
                    url: url_for(controller: 'laastras', action: 'privacy'),
                    inner_text: (I18n.t 'privacy')
                },
                {
                    url: url_for(controller: 'laastras', action: 'cookies'),
                    inner_text: (I18n.t 'cookies')
                },
                {
                    url: url_for(controller: 'laastras', action: 'contact'),
                    inner_text: (I18n.t 'contact_us')
                }
            ]
        end

        def laastras_services 
            [
                {
                    url: url_for(controller: 'e_commerce', action: 'job_offer_posting'),
                    inner_text: (I18n.t 'job_offer_posting_label')
                },
                {
                    url: url_for(controller: 'e_commerce', action: 'real_estate_posting'),
                    inner_text: (I18n.t 'real_estate_posting_label')
                },
                {
                    url: url_for(controller: 'e_commerce', action: 'online_shopping_service'),
                    inner_text: (I18n.t 'online_shopping_label')
                },
                {
                    url: url_for(controller: 'e_commerce', action: 'sofware_solutions_service'),
                    inner_text: (I18n.t 'software_solutions_service_label')
                },
                {
                    url: url_for(controller: 'logistics', action: 'shipment_service'),
                    inner_text: (I18n.t 'shipment_service_label')
                },
                {
                    url: url_for(controller: 'logistics', action: 'bus_service'),
                    inner_text: (I18n.t 'bus_service_label')
                },
                {
                    url: url_for(controller: 'logistics', action: 'cab_service'),
                    inner_text: (I18n.t 'cab_service_label')
                },
                {
                    url: url_for(controller: 'logistics', action: 'bike_service'),
                    inner_text: (I18n.t 'bike_service_label')
                }
            ]
        end

        def social_media_data
            {
                facebook: {
                    href: 'https://laastras.herokuapp.com',
                    hashtag: '#laas',
                    quote: (I18n.t 'site_meta_description')
                }
            }
        end

        def supported_languages 
            [
                {locale: 'en_US', language: (I18n.t 'english'), country: (I18n.t 'usa')},
                {locale: 'ru_BI', language: (I18n.t 'kirundi'), country: (I18n.t 'burundi')},
                {locale: 'rw_RW', language: (I18n.t 'rwandan'), country: (I18n.t 'rwanda')},
                {locale: 'lg_UG', language: (I18n.t 'luganda'), country: (I18n.t 'uganda')},
                {locale: 'fr_FR', language: (I18n.t 'french'), country: (I18n.t 'france')},
                {locale: 'sw_TZ', language: (I18n.t 'swahili'), country: (I18n.t 'tanzania')}
            ]
        end
    end
end
