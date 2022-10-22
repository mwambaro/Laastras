require 'json'
require 'core_ext/string'

class LaastrasController < ApplicationController
    before_action :init_parameters, :corb_disable

    def home
        next_uri = nil 
        begin 
            sha256 = '8CB9B9BA4799A69CDDB84B4DFDB4D1309D3D157C532BE8AB050720A2B36FF946'
            @video = LaastrasMarketingVideo.find_by_sha256(sha256)
            unless @video.nil?
                view_url = url_for(
                    controller: 'laastras_marketing_videos',
                    action: 'show_video',
                    video_id: @video.sha256,
                    disposition: 'inline'
                )
                @laas_os_video_teaser = {
                    view_url: view_url,
                    mime_type: @video.mime_type,
                    filename: Pathname.new(@video.uri).basename.to_s,
                    html_id: 'laas-os-video-teaser-id'
                }
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # home

    # Is redirected to after OAuth 2.0 authorization code
    def social_media_share
        next_uri = nil 
        begin
            log_message = "social_media_share parameters: #{params.inspect}"
            logger.debug log_message
            # LinkedIn
            client_id = '78sdfr1etqdjwp' # Linkedin App id
            if params[:state] =~ /\A#{client_id}/i
                @back_url, @status, @log_message = LaastrasHelper.share_to_linkedin(params, logger)
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # social_media_share

    def services
    end # services

    def hire_us
        next_uri = nil 
        begin 
            @expertise_fields = {
                expertise_capture: (I18n.t 'hire_us_capture'),
                software_engineering_expertise: (I18n.t 'software_engineering_label'),
                business_ideation_expertise: (I18n.t 'business_ideation_label'),
                policy_making_expertise: (I18n.t 'policy_making_expertise'),
                tech_evangelization_expertise: (I18n.t 'tech_evang_expertise')
            }

            @expertise_details = {
                software_engineering_expertise_details: (I18n.t 'software_engineering_expertise_details'),
                business_ideation_expertise_details: (I18n.t 'business_ideation_expertise_details'),
                policy_making_expertise_details: (I18n.t 'policy_making_expertise_details'),
                tech_evangelization_expertise_details: (I18n.t 'tech_evangelization_expertise_details')
            }

            @detailed_cv = {
                cv_title: 'Detailed Curriculum Vitae (CV)',
                detailed_cv_data: (I18n.t 'detailed_cv_data')
            }
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # hire_us

    def donate
    end

    def sign_in
        next_uri = nil
        begin 
            service_id = params[:service_id]
            if service_id.nil? || service_id.blank? || service_id == 'nil'
                @sign_in_action_url = url_for(controller: 'users', action: 'sign_in')
            else 
                @sign_in_action_url = url_for(
                    controller: 'users', 
                    action: 'sign_in',
                    service_id: service_id
                )
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end
    end

    def sign_up
        next_uri = nil
        begin 
            service_id = params[:service_id]
            reset_pwd = params[:reset_pwd]
            if !reset_pwd.nil?
                @sign_up_action_url = url_for(
                    controller: 'users', 
                    action: 'sign_up',
                    reset_pwd: reset_pwd,
                    email: params[:email],
                    password: params[:password]
                )
            elsif !service_id.nil? && service_id != 'nil'                
                @sign_up_action_url = url_for(
                    controller: 'users', 
                    action: 'sign_up',
                    service_id: service_id
                )
            else 
                @sign_up_action_url = url_for(controller: 'users', action: 'sign_up')
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end
    end

    def sign_out 
        next_uri = nil 
        begin
            ApplicationHelper.logout_user(session)
            next_uri = url_for(controller: 'laastras', action: 'home')
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # sign_out

    def locale 
        next_uri = nil 
        begin
            data = ApplicationHelper.set_locale(params, session)
            render plain: JSON.generate(data) unless data.nil?
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # locale

    def terms_of_use
    end # terms_of_use

    def privacy
    end # privacy

    def cookies
    end # cookies

    def about
    end # about

    def contact
    end # contact

    def web_stats 
        next_uri = nil 
        begin
            @web_statistics = ApplicationHelper.web_stats_code
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # web_stats

    def init_parameters
        next_uri = nil 
        begin 
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.harvest_analytics(session, request)
            @site_title = "Laastras | #{params[:action]}"
            @laastras_banner_image = ApplicationHelper.banner_image_asset_url(
                request
            )
            @open_graph_proto_image_url = ApplicationHelper.banner_image_asset_url(
                request
            )
            @language_icon = ApplicationHelper.image_asset_url(
                request, 'language_icon.png'
            )

            @headerData = ApplicationHelper::SiteHeaderData.new(request, logger)
            @laastras_actions = @headerData.laastras_actions

            @laastras_user_is_logged_in = false.to_s 
            @profile_photo_url = '#'
            @show_profile_url = '#'
            laastras_user = ApplicationHelper.who_is_logged_in?(session)
            unless laastras_user.nil?
                @laastras_user_is_logged_in = true.to_s
                @profile_photo_url = url_for(controller: 'users', action: 'profile_image_show', id: laastras_user.id)
                @show_profile_url = url_for(controller: 'users', action: 'show', id: laastras_user.id)
            end

            if ApplicationHelper.user_has_admin_role?(session)
                @laastras_actions << {
                    url: '',
                    inner_text: (I18n.t 'laastras_admin_dashboard_label'),
                    dropdown_boolean: 'true',
                    data: [
                        {
                            url: url_for(controller: 'users', action: 'index'),
                            inner_text: (I18n.t 'laastras_users_label')
                        },
                        {
                            url: url_for(controller: 'laastras_page_views', action: 'analytics'),
                            inner_text: (I18n.t 'website_statistics')
                        },
                        {
                            url: url_for(controller: 'laastras_documents', action: 'index_lsdoc'),
                            inner_text: (I18n.t 'laastras_documents_label')
                        },
                        {
                            url: url_for(controller: 'laastras_mature_videos', action: 'index'),
                            inner_text: (I18n.t 'laastras_mature_videos_label')
                        },
                        {
                            url: url_for(controller: 'laastras_marketing_videos', action: 'index'),
                            inner_text: (I18n.t 'laastras_marketing_videos_label')
                        }
                    ]
                }
            end

            @cache_store = Laastras::Application.config.action_controller.cache_store
            @action_name = params[:action].nil? ? '' : params[:action]
            @kick_off = I18n.t 'kick_off'
            @tap_click_image = I18n.t 'click_or_tap_image_text'
            @mission = I18n.t 'mission'
            @home_label = I18n.t 'home_label'
            @cookies_policy_body_text = I18n.t 'cookies_policy_body_text'
            @privacy_policy_body_text = I18n.t 'privacy_policy_body_text'
            @about_our_mission_body_text = I18n.t 'laastras_mission_terms_description'
            @terms_of_use_body_text = I18n.t 'terms_of_use_body_text'
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

            @footer_actions = @headerData.footer_actions
            @social_media_data = @headerData.social_media_data
            @laastras_sample_services = [
                (I18n.t 'iot'),
                (I18n.t 'means_of_exchange'),
                (I18n.t 'equality_policy'),
                (I18n.t 'logistics_ecommerce'),
                (I18n.t 'aori_globalization')
            ]
            @laastras_e_logo_urls = [
                {
                    image_url: ApplicationHelper.image_asset_url(
                        request, 'Logo-e-grocery.svg'
                    ),
                    service_url: url_for(
                        controller: 'services',
                        action: 'e_grocery'
                    )
                },
                {
                    image_url: ApplicationHelper.image_asset_url(
                        request, 'Logo-e-card.svg'
                    ),
                    service_url: url_for(
                        controller: 'services',
                        action: 'e_card'
                    )
                },
                {
                    image_url: ApplicationHelper.image_asset_url(
                        request, 'Logo-e-logistics.svg'
                    ),
                    service_url: url_for(
                        controller: 'services',
                        action: 'e_logistics'
                    )
                },
                {
                    image_url: ApplicationHelper.image_asset_url(
                        request, 'Logo-e-alliances.svg'
                    ),
                    service_url: url_for(
                        controller: 'services',
                        action: 'e_alliances'
                    )
                }
            ]
            @globalization_intro = (I18n.t 'mission_terms').paragraphize
            @supported_languages = @headerData.supported_languages
            @featured_job_offers = @headerData.featured_job_offers

            #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
            @site_background_image_url = ApplicationHelper.image_asset_url(
                request, '838457-default-background-image.jpg'
            )
            @logo_image_url = ApplicationHelper.image_asset_url(
                request, 'Logo-03.svg'
            )
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # init_parameters

    def handle_cookies(locale)
        next_uri = nil 
        begin 
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
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # handle_cookies

    def corb_disable 
        next_uri = nil 
        begin
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
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        if next_uri 
            redirect_to next_uri
        end

    end # corb_disable
end
