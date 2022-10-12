
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
                        .gsub(/laastras\/home/i, '')
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

    def self.build_send_data_options(request, fname, type)
        options = {
            disposition: 'attachment',
            filename: fname,
            type: type
        }
        agent = request.user_agent 
        if /firefox[\\\/](\d+)\.(\d+)/i =~ agent
            r_maj = 105
            r_min = 0
            major = $1.to_i
            minor = $2.to_i 
            if (major >= r_maj) 
                options[:disposition] = 'inline'
            end
        elsif /edg[\\\/](\d+)\.(\d+)\.(\d*)\.(\d*)/i =~ agent
            r_maj = 100
            r_min = 0
            r_build = 1185
            r_rev = 50
            major = $1.to_i
            minor = $2.to_i 
            build = $3.to_i
            revision = $4.to_i
            if (major >= r_maj && minor >= r_min && build >= r_build && revision >= r_rev) 
                options[:disposition] = 'inline'
            end
        elsif /chrome[\\\/](\d+)\.(\d+)\.(\d*)\.(\d*)/i =~ agent
            r_maj = 100
            r_min = 0
            r_build = 0
            r_rev = 0
            major = $1.to_i
            minor = $2.to_i 
            build = $3.to_i
            revision = $4.to_i
            if (major >= r_maj && minor >= r_min && build >= r_build && revision >= r_rev) 
                options[:disposition] = 'inline'
            end
        end

        options

    end # build_send_data_options

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

    end # image_asset_url

    def self.document_asset_url(file)
        path = Pathname.new(Rails.root.join('storage', 'laastras_documents'))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', 'laastras_documents', file)

    end # document_asset_url

    def self.job_seeker_asset_url(fname)
        path = Pathname.new(Rails.root.join('storage', 'laastras_job_seekers_documents'))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', 'laastras_job_seekers_documents', fname)

    end # job_seeker_asset_url

    def self.user_profile_photo_asset_url(fname)
        path = Pathname.new(Rails.root.join('storage', 'laastras_users_profile_photos'))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', 'laastras_users_profile_photos', fname)

    end # user_profile_photo_asset_url
    
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
        def initialize(rqst, logg=nil)
            @request = rqst
            self.request = @request
            self.logger = logg
        end

        def featured_job_offers
            featured_job_offers = []
            begin
                self.seed_job_offers

                # 1.
                language = I18n.locale.to_s
                title = (I18n.t 'project_manager_assistant')
                sql_query = "SELECT * FROM laastras_job_offers WHERE language = '#{language}' AND title = '#{title}'"
                job_offer = LaastrasJobOffer.find_by_sql(sql_query).first
                if job_offer
                    featured_job_offers << {
                        show_url: url_for(controller: 'laastras_job_offers', action: 'show', id: job_offer.id),
                        title: job_offer.title
                    }
                end
                # 2.
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
            end
    
            featured_job_offers
    
        end # featured_job_offers

        def seed_job_offers
            begin
                # Have we seeded the database ?
                # We assume all went well first time we seeded.
                # Please, restart seeding from scratch if you add more job offers
                title = (I18n.t 'project_manager_assistant')
                sql_query = "SELECT * FROM laastras_job_offers WHERE title = '#{title}'"
                count = LaastrasJobOffer.find_by_sql(sql_query).count
                if count > 0 
                    logger.debug '---> No need to seed laastras_job_offers database table. Looks already seeded'
                    return nil
                end
    
                job_offers = []
                original_language = I18n.locale
                I18n.available_locales.each do |lang|
                    I18n.locale = lang.to_sym
                    job_offers << {  
                        title: (I18n.t 'project_manager_assistant'),
                        description: (I18n.t 'project_manager_assistant_offer'),
                        language: lang.to_s,
                        application_uri: nil           
                    }
                    # add more job offers below
                end
                I18n.locale = original_language
    
                job_offers.each do |offer|
                    job_offer = LaastrasJobOffer.new({
                        title: offer[:title],
                        description: offer[:description],
                        application_uri: offer[:application_uri],
                        language: offer[:language]
                    })
                    if job_offer.save
                        sql_query = "SELECT * FROM laastras_job_offers WHERE title = '#{job_offer.title}'"
                        db_offer = LaastrasJobOffer.find_by_sql(sql_query).first
                        db_offer.update({
                            application_uri: url_for(
                                controller: 'laastras_job_offers',
                                action: 'apply',
                                id: db_offer.id
                            )
                        })
                    else
                        if job_offer.errors.count > 0 
                            message = ""
                            job_offer.errors.each do |error| 
                                message += "\r\n#{error.full_message}"
                            end
                            msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + message
                            logger.debug msg
                        end
                        message = "We failed to save to database the job offer: #{job_offer.title}"
                        msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + message
                        logger.debug msg
                    end
                end

            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
            end
    
        end # seed_job_offers

        def laastras_actions
            [
                {
                    url: url_for(controller: 'laastras_job_offers', action: 'index'),
                    inner_text: (I18n.t 'career_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: url_for(controller: 'laastras', action: 'hire_us'),
                    inner_text: (I18n.t 'hire_us_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: url_for(controller: 'laastras', action: 'donate'),
                    inner_text: (I18n.t 'donate_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: '',
                    inner_text: (I18n.t 'services_label'),
                    dropdown_boolean: 'true',
                    data: self.laastras_services
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
                    url: url_for(controller: 'services', action: 'e_grocery'),
                    inner_text: (I18n.t 'food_source_and_water_label')
                },
                {
                    url: url_for(controller: 'services', action: 'e_card'),
                    inner_text: (I18n.t 'caas_label')
                },
                {
                    url: url_for(controller: 'services', action: 'e_logistics'),
                    inner_text: (I18n.t 'free_trade_capability_label')
                },
                {
                    url: url_for(controller: 'services', action: 'e_alliances'),
                    inner_text: (I18n.t 'leadership_in_globalization_label')
                },
                {
                    url: url_for(controller: 'services', action: 'e_myth'),
                    inner_text: (I18n.t 'mythology_label')
                },
                {
                    url: url_for(controller: 'services', action: 'e_phylosophy'),
                    inner_text: (I18n.t 'morshux_label')
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
