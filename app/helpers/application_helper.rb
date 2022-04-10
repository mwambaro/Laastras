
include ActionView::Helpers::AssetUrlHelper

module ApplicationHelper
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
end
