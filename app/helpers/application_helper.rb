
include ActionView::Helpers::AssetUrlHelper
require 'net/http'

module ApplicationHelper
    def self.max_number_of_users 
        max = 80
    end

    def self.max_profile_photo_size 
        max = 2.megabytes
    end

    def self.max_job_seeker_doc_size 
        mex = 2.megabyte
    end

    def self.get_device_id(req)
        id = "#{req.remote_ip}@#{req.user_agent}"

    end # get_device_id

    def self.unique_file_name(fname, logger=nil)
        ufname = fname 
        begin 
            extname = Pathname.new(fname).extname 
            if extname.blank?
                ufname = "#{fname}_#{Time.now.to_i}"
            else
                ufname = "#{fname.chomp(extname)}_#{Time.now.to_i}#{extname}"
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

        ufname

    end # unique_file_name

    def self.set_locale_from_request(request, logger=nil, session=nil)
        locale = nil 
        begin
            unless (request.nil? || request.blank?)
                url = URI.parse(request.original_url)
                unless url.nil?
                    query = url.query 
                    unless (query.nil? || query.blank?) 
                        if query =~ /locale=([^&]+)/i 
                            locale = $1 
                            unless (locale.nil? || locale.blank?)
                                I18n.locale = locale.to_sym
                                session[:active_language] = locale.to_s unless session.nil?
                            end
                        end
                    end
                end
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

        locale 

    end # set_locale_from_request

    def self.harvest_analytics(session, request)
        if true 
            return nil
        end

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

    def self.open_graph_variables(request)
        variables = {
            site_description: (I18n.t 'site_meta_description'),
            open_graph_proto_title: (I18n.t 'opg_site_meta_title'),
            open_graph_proto_site_url: request.original_url,
            open_graph_proto_description: (I18n.t 'opg_site_meta_description'),
            open_graph_proto_image_url: self.banner_image_asset_url(request),
            open_graph_proto_locale: self.to_open_graph_locale(I18n.locale),
            available_locales: self.available_locales,
            default_locale: self.to_open_graph_locale(I18n.default_locale)
        }

    end # open_graph_variables 

    def self.to_open_graph_locale(locale)
        og_locale = locale.to_s
        if locale.to_s.match? /\Aen\Z/i
            og_locale = 'en_US'
        elsif locale.to_s.match? /\Afr\Z/i
            og_locale = 'fr_FR'
        elsif locale.to_s.match? /\Asw\Z/i 
            og_locale = 'sw_TZ'
        elsif locale.to_s.match? /\Alg\Z/i 
            og_locale = 'lg_UG'
        elsif locale.to_s.match? /\Aru\Z/i 
            og_locale = 'ru_BI'
        elsif locale.to_s.match? /\Arw\Z/i 
            og_locale = 'rw_RW'
        end

        og_locale 

    end # to_open_graph_locale

    def self.available_locales
        locales = [] 
        I18n.available_locales.each do |locale|
            locales << self.to_open_graph_locale(locale)
        end 

        locales 

    end # available_locales

    def self.job_offer_guid_to_job_offer(job_offer_guid) 
        job_offer = nil
        
        offers = {}
        sha256 = '3AABAA6512AF2E7415BF1B4405EAAE27FFC97D63D9E74523925C264FE07C44DC'
        offers[sha256.to_sym] = I18n.t 'project_manager_assistant'
        sha256 = '25C950615B149CC57887039035EF3A4A2FE89307CD85253AB64932B3F10EEC4D'
        offers[sha256.to_sym] = I18n.t 'venture_capital_professional'
        sha256 = '988EC164FF45A4D1318FDC3B1DC70ADDC0D495485ED19D32B3EBE132C7FF7861'
        offers[sha256.to_sym] = I18n.t 'ngo_chief_of_mission'
        sha256 = 'EE782BA12A138541290F8570F25F71ABF9983CA428C4E7E8E6AFF171A60A70A3'
        offers[sha256.to_sym] = I18n.t 'head_of_state_or_prime_minister'
        sha256 = 'EF0B5D9A0389CAC9116C22BF16B5A6AE2000C7C075F7CC6BDF717336B3FE7103'
        offers[sha256.to_sym] = I18n.t 'standards_or_specifications_maker'
        sha256 = '7BAF9D72FAF8FF016EC539F7869313EB5C352BDDC59B7CB758CB405B8D23BEAD'
        offers[sha256.to_sym] = I18n.t 'un_secretary_general'
        sha256 = 'F1FAA914FDBF389EDCE9BBBED6A7A78F2BA886258BB0CD0FBE3145CC8D5A0E49'
        offers[sha256.to_sym] = I18n.t 'software_engineer'
        sha256 = 'F62AF06A3556E093BA365DAD7B881551F72F561513F760DF94E21630EDA20AC4'
        offers[sha256.to_sym] = I18n.t 'grocery_shopping_agent'
        sha256 = '18022E035350EA17AE3A0133D4C30676E088B1A6119E6680426AC12D18A8EA4A'
        offers[sha256.to_sym] = I18n.t 'grocery_truck_driver'

        if offers.key? job_offer_guid.to_sym
            title = offers[job_offer_guid.to_sym] 
            unless title.blank? 
                job_offer = LaastrasJobOffer.find_by_title(title)
            end
        end

        job_offer

    end # job_offer_guid_to_job_offer

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
    
    def self.banner_image_asset_url(request)
        url = nil 
        asset_name = 'Laastras-e-banner-lg-en.JPG'
        if /\Afr|fr_FR\Z/i =~ I18n.locale.to_s
            asset_name = 'Laastras-e-banner-lg-fr.JPG'
        end
        unless request.nil?
            url = ApplicationHelper.image_asset_url(
                request, asset_name
            )
        end
        url = "/images/#{asset_name}" if url.nil?

        url 

    end # banner_image_asset_url

    def self.image_asset_url(request, file)
        if request.nil?
            path_to_image(file)
        else
            request.protocol + request.host_with_port + path_to_image(file)
        end

    end # image_asset_url

    def self.get_db_schema_asset_url
        path = nil
        file = 'schema.rb'
        path = Pathname.new(Rails.root.join('db'))
        if path.exist?
            path = Rails.root.join('db', file)
        end
        
        path

    end # get_db_schema_asset_url

    def self.document_asset_url(file)
        folder_name = 'laastras_documents'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, file)

    end # document_asset_url

    def self.job_seeker_asset_url(fname)
        folder_name = 'laastras_job_seekers_documents'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)

    end # job_seeker_asset_url

    def self.mature_video_asset_url(fname) 
        folder_name = 'laastras_mature_videos'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)

    end # mature_video_asset_url

    def self.marketing_video_asset_url(fname) 
        folder_name = 'laastras_marketing_videos'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)

    end # marketing_video_asset_url

    def self.user_profile_photo_asset_url(fname)
        folder_name = 'laastras_users_profile_photos'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)

    end # user_profile_photo_asset_url

    def self.log_file_asset_url 
        fname = Rails.env + '.laastras.log'
        path = Pathname.new(Rails.root.join('log'))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('log', fname)

    end # log_file_asset_url

    def self.milestone_elements_asset_url(fname)
        folder_name = 'milestone_element_images'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)

    end # milestone_element_images

    def self.marketing_images_asset_url(fname)
        folder_name = 'laastras_marketing_images'
        path = Pathname.new(Rails.root.join('storage', folder_name))
        unless path.exist?
            path.mkpath
        end
        Rails.root.join('storage', folder_name, fname)
        
    end # marketing_images_asset_url

    def self.log_model_errors(model, logger)
        msg = "\r\n#{model.errors.count} error(s) prohibited this model from being saved:"
        model.errors.each do |error|
            msg += "\r\n" + error.full_message
        end
        mssge = Time.now.to_s + ": " + msg
        logger.debug mssge unless logger.nil?

    end # log_model_errors

    # <summary>
    #       Given a user session, if the user is logged in, is the user ADMIN?
    # </summary>
    # <param name="session"> The Rails session object. You should know what you stored there. </param>
    def self.user_has_admin_role?(session, logger=nil)
        admin = false
        begin
            unless session.nil?
                if session[:logged_in]
                    unless session[:user_id].nil?
                        user = User.find(session[:user_id])
                        unless user.nil?
                            unless user.role.nil?
                                admin = user.role.match?(/\AAdmin\Z/i)
                            end
                        end
                    end
                end
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

        admin

    end # user_has_admin_role?

    # <summary>
    #       Given session object, find the user who is logged in.
    # </summary>
    # <param name="session"> The Rails session object. We assume you know what to look for in it. </param>
    # <returns> The logged in user, if any, or nil </returns>
    def self.who_is_logged_in?(session, logger=nil)
        user = nil
        begin
            unless session.nil?
                if session[:logged_in] == true
                    unless session[:user_id].nil?
                        us = User.find(session[:user_id])
                        unless us.nil?
                            user = us
                        end
                    end
                end
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
        end

        user

    end # who_is_logged_in?

    def self.logout_user(session)
        lc_session = session
        unless lc_session.nil?
            user = User.find(lc_session[:user_id])
            unless user.nil?
                user.update({
                    device_id: nil,
                    last_logout: Time.now
                })
            end
            lc_session[:user_id] = nil
            lc_session[:logged_in] = false
            user.update({device_id: nil})
        end

        lc_session

    end # logout_user

    # Site header data
    class SiteHeaderData < ApplicationController
        def initialize(rqst, logg=nil)
            @request = rqst
            self.request = @request
            self.logger = logg

        end # initialize 

        def send_mail(dest_email, message, orig_email=nil) 
            val = nil 
            begin 
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                        __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
            end

            val 

        end # send_mail

        def featured_job_offers
            featured_job_offers = []
            begin
                language = I18n.locale.to_s
                featured = true
                archived = false
                sql = "SELECT * FROM laastras_job_offers WHERE language = '#{language}' AND featured = '#{featured}' AND archived = #{archived} ORDER BY created_at"
                LaastrasJobOffer.find_by_sql(sql)
                    .each do |job_offer|
                        featured_job_offers << {
                            show_url: url_for(controller: 'laastras_job_offers', action: 'show', id: job_offer.id),
                            title: job_offer.title
                        }
                    end
            rescue Exception => e 
                message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                logger.debug message unless logger.nil?
            end
    
            featured_job_offers
    
        end # featured_job_offers

        def laastras_actions
            [
                {
                    url: url_for(controller: 'laastras_job_offers', action: 'index'),
                    inner_text: (I18n.t 'career_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: url_for(
                        controller: 'laastras_documents', 
                        action: 'show_laastras_document', 
                        doc_id: '055837F55289B847D59B7982C426387E1933CCDB69502E97D3BB0525FDE7A7C7',
                        locale: I18n.locale.to_s
                    ),
                    inner_text: (I18n.t 'sales_label'),
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
                    url: url_for(controller: 'laastras_crm_strategies', action: 'index'),
                    inner_text: (I18n.t 'crm_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: url_for(controller: 'laastras_contracts', action: 'index'),
                    inner_text: (I18n.t 'contracts_label'),
                    dropdown_boolean: 'false',
                    data: ''
                },
                {
                    url: url_for(controller: 'money_transfer', action: 'donate'),
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

        end # laastras_actions

        def laastras_erp_actions 
            [
                {
                    url: url_for(controller: 'laastras_erp_business_case', action: 'erp_business_case'),
                    inner_text: (I18n.t 'erp_business_case')
                },
                {
                    url: url_for(controller: 'laastras_erp_business_case', action: 'erp_implementation'),
                    inner_text: (I18n.t 'erp_implementation')
                },
                {
                    url: url_for(controller: 'laastras_erp_business_case', action: 'erp_risks_and_pitfalls'),
                    inner_text: (I18n.t 'erp_risks_and_pitfalls')
                }
            ]

        end # laastras_erp_actions

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

        end # footer_actions

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

        end # laastras_services

        def social_media_data
            {
                facebook: {
                    href: 'https://laastras.herokuapp.com',
                    hashtag: '#laas',
                    quote: (I18n.t 'site_meta_description')
                }
            }

        end # social_media_data

        def supported_languages 
            [
                {locale: 'en_US', language: (I18n.t 'english'), country: (I18n.t 'usa')},
                {locale: 'ru_BI', language: (I18n.t 'kirundi'), country: (I18n.t 'burundi')},
                {locale: 'rw_RW', language: (I18n.t 'rwandan'), country: (I18n.t 'rwanda')},
                {locale: 'lg_UG', language: (I18n.t 'luganda'), country: (I18n.t 'uganda')},
                {locale: 'fr_FR', language: (I18n.t 'french'), country: (I18n.t 'france')},
                {locale: 'sw_TZ', language: (I18n.t 'swahili'), country: (I18n.t 'tanzania')}
            ]

        end # supported_languages 

        def laastras_roles 
            {
                client: 'Client',
                admin: 'Admin',
                employee: 'employee',
                job_seeker: 'Job seeker',
                associate: 'Associate',
                partner_to_be: 'Partner-to-be'
            }
        end # laastras_roles

    end # SiteHeaderData

    class LaastrasLogger 
        def initialize(log=nil)
            @log_file = log 
            if @log_file.nil? || @log_file.blank? 
                @log_file = ApplicationHelper.log_file_asset_url
            end

        end # initialize 

        def debug(message) 
            self.truncate
            File.open(@log_file, "a+"){|io| io.write("\r\n#{Time.now.to_s}: #{message}")}
        end

        private 
            def truncate 
                if File.exists? @log_file
                    file = Pathname.new @log_file 
                    if file.size > 10.megabytes 
                        File.delete(file)
                        @log_file = ApplicationHelper.log_file_asset_url
                    end
                end

            end # truncate
    end

    class Seeds 
        def initialize(logger=nil)
            @logger = logger 
            if @logger.nil?
                @logger = ApplicationHelper::LaastrasLogger.new
            end

        end # initialize

        def seeding_laastras_contracts 
            contracts = nil 
            begin 
                s_locale = I18n.locale 
                I18n.available_locales.each do |locale|
                    I18n.locale = locale 
                    contracts = [] if contracts.nil?
                    contracts << {
                        title: (I18n.t 'laastras_contract_with_the_company_title'),
                        description: (I18n.t 'laastras_contract_with_the_company_message'),
                        language: locale.to_s,
                        sha256: 'D51F3909EBC516DA2DC30748DCD7273A12AF90768BD302CACD6EBB70404C5462'
                    }
                    contracts << {
                        title: (I18n.t 'project_manager_assistant_work_contract_title'),
                        description: (I18n.t 'project_manager_assistant_work_contract_message'),
                        language: locale.to_s,
                        sha256: 'CC2900EFB2B91A92955B70021D56093965252A93043F17E5A7068A11500C3E0D'
                    }
                    contracts << {
                        title: (I18n.t 'project_manager_assistant_intimacy_contract_title'),
                        description: (I18n.t 'project_manager_assistant_intimacy_contract_message'),
                        language: locale.to_s,
                        sha256: 'E9BE8321BE63CA2E2CB3630C67A13076B4B6A0A4E0D2A55A4D4E8100A0CFCE59'
                    }
                end
                I18n.locale = s_locale

                val = LaastrasContract.create(contracts)
                unless val
                    raise 'There were errors seeding laastras contracts'
                end

                contracts.each do |contract| 
                    title = contract[:title] 
                    d = LaastrasContract.find_by_title title 
                    if d.nil? 
                        msg = "Contract [#{contract.title}][#{contract.sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end
            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            contracts 

        end # seeding_laastras_contracts

        def seeding_laastras_crm_strategies 
            strategies = nil 
            begin 
                strategies = []
                s_locale = I18n.locale
                I18n.available_locales.each do |locale|
                    I18n.locale = locale
                    strategies << {
                        laastras_crm_title: (I18n.t 'laastras_price_and_permit_as_a_project_proposal_title'),
                        laastras_crm_description: (I18n.t 'laastras_price_and_permit_as_a_project_proposal_message'),
                        language: locale.to_s,
                        sha256: '07A001BFF37F5C185A2EF5D7FF7003158DE54A4FA917A2EA619EC622D25F4A09'
                    }
                    strategies << {
                        laastras_crm_title: (I18n.t 'the_special_un_integration_commission_title'),
                        laastras_crm_description: (I18n.t 'the_special_un_integration_commission_message'),
                        language: locale.to_s,
                        sha256: '9CF2B419EEB4FDF9F302794F75EFBC0232FE19A1DFC340E457C8595F58C21D7B'
                    }
                    strategies << {
                        laastras_crm_title: (I18n.t 'the_special_rescue_department_title'),
                        laastras_crm_description: (I18n.t 'the_special_rescue_department_message'),
                        language: locale.to_s,
                        sha256: '38284A6DBFD86245BF64063A1DECD2C24C9B70896E0A3C39EC16E827755D32EA'
                    }
                    strategies << {
                        laastras_crm_title: (I18n.t 'homocracy_ransom_and_full_nda_issue_title'),
                        laastras_crm_description: (I18n.t 'homocracy_ransom_and_full_nda_issue_message'),
                        language: locale.to_s,
                        sha256: 'C8F5134F5C38D268AB50E83110A9F1897EFF337F86722AA830E385CFE80C180E'
                    }
                end
                I18n.locale = s_locale

                val = LaastrasCrmStrategy.create(strategies)
                unless val
                    raise 'There were errors seeding laastras crm strategies'
                end

                strategies.each do |strategy| 
                    title = strategy[:laastras_crm_title] 
                    d = LaastrasCrmStrategy.find_by_laastras_crm_title title 
                    if d.nil? 
                        msg = "Strategy [#{strategy.laastras_crm_title}][#{strategy.sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end    

            strategies

        end # seeding_laastras_crm_strategies

        def seeding_laastras_documents 
            docs = nil 
            begin 
                docs = [
                    {
                        sha256: '31AA643CFA2706D6C9B00AB8623652CEA848622095D4959C912FC36922F8E9C6',
                        title: 'Cover-Letter-Public-Relations__English (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Cover-Letter-Public-Relations__English.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '33C86A7C60B726707A257AD4FA50CADDF791D404EDED1FA73C016BCF71EF5436',
                        title: 'Cover-Letter-Public-Relations__English (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Cover-Letter-Public-Relations__English.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: '0C78F97D01415A3B8552DD6DDB7539195E823F635577E55A26E6D3A4B4C320A8',
                        title: 'Cover-Letter-Public-Relations__French (.docx)',
                        language: 'fr_FR',
                        uri: ApplicationHelper.document_asset_url(
                            'Cover-Letter-Public-Relations__French.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: 'F05511B6E7F2586E9860ADE3160158F4ED85D28CA73A555ABB6AD102D1A89456',
                        title: 'Cover-Letter-Public-Relations__French (.pdf)',
                        language: 'fr_FR',
                        uri: ApplicationHelper.document_asset_url(
                            'Cover-Letter-Public-Relations__French.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: '1B69AA5A631E79BF6FA93863C03C122441E7A52DF11CC18A1F849F9A8757FE1B',
                        title: 'Job-Offer-Description (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Job-Offer-Description.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '7538F641ACE968A1B4046213847828D7C08F2B9DC34BD90D73CC0213BFACD1D6',
                        title: 'Job-Offer-Description (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Job-Offer-Description.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: '8B434CF7A7A658ED24BAD9CE0DFD308545E91921D2098DB736876F2CFE2C4790',
                        title: 'Laastras-organization-mission-book (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Laastras-organization-mission-book.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '001B6512DC363F772364FC7FE2E25D2BDF5E3125ECCCA57EB0DD8DA57E096739',
                        title: 'Laastras-organization-mission-book (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Laastras-organization-mission-book.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: 'B9C1999A86326E370ABF5C971A00EBE4FE2F75E4ED88A7992372909BD63A2B46',
                        title: 'Laastras-Specification (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Laastras-Specification.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '6B4064066E25B8201C7C2769D826089F67B0D3C1369DAEB1A2209FCFB6B8B09C',
                        title: 'Laastras-Specification (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'Laastras-Specification.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: '79B25BF32D33289C8D39CB656DA1BED6BADDD869DEC63B186A8C2AE69373DF98',
                        title: 'project-management-blue-print (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'project-management-blue-print.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '4FBAFE7D0A728FFFA6646FB2495FE8940830B253A1C9D7FE1859CE5080946850',
                        title: 'project-management-blue-print (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'project-management-blue-print.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: 'D2C5A22801A6E242B73B8B66C979DD708B970303A8ABCA6BC6213746DD7763A0',
                        title: 'README (.docx)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'README.docx'
                        ),
                        mime_type: 'application/docx'
                    },
                    {
                        sha256: '1C76F943B12FC398420ED4EA75DA567F1E77419E2772757DA85CA77B2580033C',
                        title: 'README (.pdf)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'README.pdf'
                        ),
                        mime_type: 'application/pdf'
                    },
                    {
                        sha256: '22CD5AD1243594F490BD7910ACE2397CD2BA0B7F3539C395E18670849AA3A3F3',
                        title: 'laastras_price_and_permit_ru-BI (.html)',
                        language: 'ru_BI',
                        uri: ApplicationHelper.document_asset_url(
                            'laastras_price_and_permit_ru-BI.html'
                        ),
                        mime_type: 'text/html'
                    },
                    {
                        sha256: '055837F55289B847D59B7982C426387E1933CCDB69502E97D3BB0525FDE7A7C7',
                        title: 'laastras-sales-job-offer (.html)',
                        language: 'en_US',
                        uri: ApplicationHelper.document_asset_url(
                            'laastras-sales-job-offer.html'
                        ),
                        mime_type: 'text/html'
                    }
                ]

                doc = LaastrasDocument.create(docs)
                unless doc
                    raise 'There were errors seeding laastras documents'
                end

                docs.each do |doc| 
                    sha256 = doc[:sha256] 
                    d = LaastrasDocument.find_by_sha256 sha256 
                    if d.nil? 
                        msg = "Document [#{doc.title}][#{sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end 

            docs 

        end # seeding_laastras_documents

        def seeding_job_offers 
            job_offers = nil
            begin 
                original_language = I18n.locale
                I18n.available_locales.each do |lang|
                    I18n.locale = lang.to_sym
                    job_offers = [] if job_offers.nil?
                    job_offers << {  
                        title: (I18n.t 'project_manager_assistant'),
                        sha256: '3AABAA6512AF2E7415BF1B4405EAAE27FFC97D63D9E74523925C264FE07C44DC',
                        description: (I18n.t 'project_manager_assistant_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'venture_capital_professional'),
                        sha256: '25C950615B149CC57887039035EF3A4A2FE89307CD85253AB64932B3F10EEC4D',
                        description: (I18n.t 'venture_capital_professional_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }  
                    job_offers << {  
                        title: (I18n.t 'software_engineer'),
                        sha256: 'F1FAA914FDBF389EDCE9BBBED6A7A78F2BA886258BB0CD0FBE3145CC8D5A0E49',
                        description: (I18n.t 'software_engineer_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }  
                    job_offers << {  
                        title: (I18n.t 'grocery_shopping_agent'),
                        sha256: 'F62AF06A3556E093BA365DAD7B881551F72F561513F760DF94E21630EDA20AC4',
                        description: (I18n.t 'grocery_shopping_agent_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    } 
                    job_offers << {  
                        title: (I18n.t 'grocery_truck_driver'),
                        sha256: '18022E035350EA17AE3A0133D4C30676E088B1A6119E6680426AC12D18A8EA4A',
                        description: (I18n.t 'grocery_truck_driver_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    } 
                    job_offers << {  
                        title: (I18n.t 'ngo_chief_of_mission'),
                        sha256: '988EC164FF45A4D1318FDC3B1DC70ADDC0D495485ED19D32B3EBE132C7FF7861',
                        description: (I18n.t 'ngo_chief_of_mission_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    } 
                    job_offers << {  
                        title: (I18n.t 'head_of_state_or_prime_minister'),
                        sha256: 'EE782BA12A138541290F8570F25F71ABF9983CA428C4E7E8E6AFF171A60A70A3',
                        description: (I18n.t 'head_of_state_or_prime_minister_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'standards_or_specifications_maker'),
                        sha256: 'EF0B5D9A0389CAC9116C22BF16B5A6AE2000C7C075F7CC6BDF717336B3FE7103',
                        description: (I18n.t 'standards_or_specifications_maker_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'un_secretary_general'),
                        sha256: '7BAF9D72FAF8FF016EC539F7869313EB5C352BDDC59B7CB758CB405B8D23BEAD',
                        description: (I18n.t 'un_secretary_general_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        archived: false,
                        application_uri: nil           
                    }
                    # add more job offers below
                end
                I18n.locale = original_language

                off = LaastrasJobOffer.create(job_offers)
                unless off 
                    raise 'There were errors seeding job offers'
                end

                job_offers.each do |offer| 
                    sha256 = offer[:sha256]
                    sql = "SELECT * FROM laastras_job_offers WHERE sha256 = '#{sha256}'"
                    offers = LaastrasJobOffer.find_by_sql(sql)
                    count = offers.count
                    if count == 0 || count < I18n.available_locales.count 
                        msg = "Job offer [#{sha256}] was not seeded in all locales"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end 

            job_offers

        end # seeding_job_offers

        def seeding_laastras_mature_videos 
            mature_videos = nil 
            begin 
                mature_videos = [
                    {
                        sha256: '76C369CDC61F563B1658D78BF5C3C81D4532C80B4316FD97E551BF5B2AB31413',
                        title: 'Fucking HoneyDippedC for breakfast.mp4',
                        uri: ApplicationHelper.mature_video_asset_url(
                            'Fucking HoneyDippedC for breakfast.mp4'
                        ),
                        mime_type: 'video/mp4'
                    },
                    {
                        sha256: '97BEC4E299A061A297D7D3B060B9299A915CC2C3D607DAF5406B568752DA4149',
                        title: 'Mom cheating milf plays away.mp4',
                        uri: ApplicationHelper.mature_video_asset_url(
                            'Mom cheating milf plays away.mp4'
                        ),
                        mime_type: 'video/mp4'
                    },
                    {
                        sha256: '179E06F67F2CE5FB7C1BA0E9BDC03818CB474E8127999DE834941867B723CA23',
                        title: 'Mom mature milf takes charge of her man.mp4',
                        uri: ApplicationHelper.mature_video_asset_url(
                            'Mom mature milf takes charge of her man.mp4'
                        ),
                        mime_type: 'video/mp4'
                    }
                ]

                video = LaastrasMatureVideo.create(mature_videos)
                unless video 
                    raise 'There were errors seeding mature videos'
                end

                mature_videos.each do |video| 
                    sha256 = video[:sha256] 
                    v = LaastrasMatureVideo.find_by_sha256 sha256 
                    if v.nil?
                        msg = "Mature video [#{video.title}][#{sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end 

            mature_videos

        end # seeding_laastras_mature_videos

        def seeding_laastras_marketing_videos 
            marketing_videos = nil 
            begin 
                marketing_videos = [
                    {
                        sha256: '8CB9B9BA4799A69CDDB84B4DFDB4D1309D3D157C532BE8AB050720A2B36FF946',
                        title: 'Laastras-LaasOS-teaser.mp4',
                        uri: ApplicationHelper.marketing_video_asset_url(
                            'Laastras-LaasOS-teaser.mp4'
                        ),
                        mime_type: 'video/mp4'
                    }
                ]

                video = LaastrasMarketingVideo.create(marketing_videos)
                unless video 
                    raise 'There were errors seeding marketing videos'
                end 

                marketing_videos.each do |video| 
                    sha256 = video[:sha256] 
                    v = LaastrasMarketingVideo.find_by_sha256 sha256 
                    if v.nil?
                        msg = "Marketing video [#{video.title}][#{sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end 

            marketing_videos

        end # seeding_laastras_marketing_videos

        def seeding_laastras_marketing_images 
            marketing_images = nil 
            begin 
                marketing_images = [
                    {
                        sha256: 'A04FFD23633B545EA0798054545B8F3FC6E7E8D227ED0CA1B72875A9EFBCF0AB',
                        title: 'Special-formatter-department-or-ministry-en.jpg',
                        uri: ApplicationHelper.marketing_images_asset_url(
                            'Special-formatter-department-or-ministry-en.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: '70732A890B1C1AC15FD405CC938EC990826D7272D61172C26BB671C215997003',
                        title: 'Special-formatter-department-or-ministry-fr.jpg',
                        uri: ApplicationHelper.marketing_images_asset_url(
                            'Special-formatter-department-or-ministry-fr.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: '065914FBBAC6A967DD1AF63972884DFE88451B0CC030854A60374DDC27B4083B',
                        title: 'Special-UN-integration-commission-en.jpg',
                        uri: ApplicationHelper.marketing_images_asset_url(
                            'Special-UN-integration-commission-en.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: '8750549BA3E48F0A8300494885E8FC99156B676770292C3C1B6299A8B6CA3E1B',
                        title: 'Special-UN-integration-commission-fr.jpg',
                        uri: ApplicationHelper.marketing_images_asset_url(
                            'Special-UN-integration-commission-fr.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    }
                ]
                video = LaastrasMarketingVideo.create(marketing_images)
                unless video 
                    raise 'There were errors seeding marketing images'
                end 

                marketing_images.each do |image| 
                    sha256 = image[:sha256] 
                    v = LaastrasMarketingVideo.find_by_sha256 sha256 
                    if v.nil?
                        msg = "Marketing image [#{video.title}][#{sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end
            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            marketing_images

        end # seeding_laastras_marketing_images

        def seeding_laastras_milestone_element_images 
            milestone_images = nil
            begin
                unless Rails.env.match?(/\Adevelopment\Z/i) 
                    raise 'These elements are only for development environment'
                end

                milestone_images = [
                    {
                        sha256: '47942C63D8DE7313E028B50C24AAEF7FBB4AC9ADB205B7F5D6B25290E2F3EF46',
                        title: 'e-grocery-image.JPG',
                        uri: ApplicationHelper.milestone_elements_asset_url(
                            'e-grocery-image.JPG'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: '84533D3496BE6F58862A3B8108CB4399BD5024FFADB279CE32B0F73148ED7BA7',
                        title: 'second.jpg',
                        uri: ApplicationHelper.milestone_elements_asset_url(
                            'second.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: '7B6DE65F40EA597839462DA755D37BADD8351580BDE399C6FBF7D6B1B1CCFF66',
                        title: 'third.jpg',
                        uri: ApplicationHelper.milestone_elements_asset_url(
                            'third.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    },
                    {
                        sha256: 'CFE23DF52667B50607DE975367C8ABE28200CA911301ED5D27F962E9833E5FF9',
                        title: 'fourth.jpg',
                        uri: ApplicationHelper.milestone_elements_asset_url(
                            'fourth.jpg'
                        ),
                        mime_type: 'image/jpeg'
                    }
                ]

                video = LaastrasMarketingVideo.create(milestone_images)
                unless video 
                    raise 'There were errors seeding milestone images'
                end 

                milestone_images.each do |image| 
                    sha256 = image[:sha256] 
                    v = LaastrasMarketingVideo.find_by_sha256 sha256 
                    if v.nil?
                        msg = "Marketing image [#{video.title}][#{sha256}] was not seeded"
                        message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                    __method__.to_s + "--- " + msg
                        @logger.debug message unless @logger.nil?
                    end
                end
            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            milestone_images

        end # seeding_laastras_milestone_element_images

        def seeding_users_database_before_reset()
            users = [] 
            begin 
                emails = []
                User.all.each {|user| emails << user.email}
                emails.each do |email| 
                    user = User.find_by_email(email)
                    next if user.nil?
                    users = [] if users.nil?
                    users << {
                        email: email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        user_name: user.user_name,
                        password_sha: user.password,
                        role: user.role,
                        device_id: nil,
                        photo_uri: nil,
                        photo_mime_type: nil,
                        verify_email_token: nil,
                        last_login: user.last_login,
                        last_logout: user.last_logout
                    }
                end

                unless users.nil? || users.empty?
                    # reset database
                    # 1. Delete schema
                    schema = ApplicationHelper.get_db_schema_asset_url
                    unless schema.nil? || schema.blank?
                        sch_file = Pathname.new(schema)
                        if sch_file.exist? 
                            File.delete(schema)
                        end
                    end
                    # 2. Reset db
                    `rails db:reset`
                    # 3. Migrate db
                    `rails db:migrate`
                    
                    user = User.create(users)
                    unless user
                        raise 'There were errors seeding users before reset'
                    end
                end

            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            users

        end # seeding_database_before_reset

    end # Seeds
end
