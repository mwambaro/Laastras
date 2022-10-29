
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
        offers['c2581c15-8863-4c70-acda-2604e8ad5795'.to_sym] = I18n.t 'project_manager_assistant'
        offers['52ff88ba-e7f7-4d7b-99a5-1bc018fef28e'.to_sym] = I18n.t 'venture_capital_professional'
        offers['08558dca-a5d8-4b46-b2bd-cc96d1028f36'.to_sym] = I18n.t 'ngo_chief_of_mission'
        offers['fb6f2e53-b891-48e1-a96d-f6ed49627086'.to_sym] = I18n.t 'head_of_state_or_prime_minister'

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
                if session[:logged_in]
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
        unless session.nil?
            session[:user_id] = nil
            session[:logged_in] = false
        end

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
                sql = "SELECT * FROM laastras_job_offers WHERE language = '#{language}' AND featured = '#{featured}' ORDER BY created_at"
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
                    url: url_for(controller: 'laastras', action: 'hire_us'),
                    inner_text: (I18n.t 'hire_us_label'),
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
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'venture_capital_professional'),
                        sha256: '25C950615B149CC57887039035EF3A4A2FE89307CD85253AB64932B3F10EEC4D',
                        description: (I18n.t 'venture_capital_professional_offer'),
                        language: lang.to_s,
                        featured: true,
                        application_uri: nil           
                    }   
                    job_offers << {  
                        title: (I18n.t 'ngo_chief_of_mission'),
                        sha256: '988EC164FF45A4D1318FDC3B1DC70ADDC0D495485ED19D32B3EBE132C7FF7861',
                        description: (I18n.t 'ngo_chief_of_mission_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        application_uri: nil           
                    } 
                    job_offers << {  
                        title: (I18n.t 'head_of_state_or_prime_minister'),
                        sha256: 'EE782BA12A138541290F8570F25F71ABF9983CA428C4E7E8E6AFF171A60A70A3',
                        description: (I18n.t 'head_of_state_or_prime_minister_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'standards_or_specifications_maker'),
                        sha256: 'EF0B5D9A0389CAC9116C22BF16B5A6AE2000C7C075F7CC6BDF717336B3FE7103',
                        description: (I18n.t 'standards_or_specifications_maker_job_offer'),
                        language: lang.to_s,
                        featured: true,
                        application_uri: nil           
                    }
                    job_offers << {  
                        title: (I18n.t 'un_secretary_general'),
                        sha256: '7BAF9D72FAF8FF016EC539F7869313EB5C352BDDC59B7CB758CB405B8D23BEAD',
                        description: (I18n.t 'un_secretary_general_job_offer'),
                        language: lang.to_s,
                        featured: true,
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

    end # Seeds
end
