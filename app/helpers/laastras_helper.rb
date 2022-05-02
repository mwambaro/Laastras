module LaastrasHelper
    def self.share_to_linkedin(params, logger)
        code = params[:code]
        state = params[:state]
        client_id = '78sdfr1etqdjwp'
        @back_url = nil
        @status = 'failure'
        # anti-forgery measure
        unless state.nil? || state.blank?
            @back_url = $1 if state =~ /\A#{client_id}(.+)\Z/i
        end

        unless code.nil? || @back_url.nil? || @back_url.blank?
            unless code.blank?
                @authorization_code = code
                grant_type = 'authorization_code'
                redirect_uri = 'https%3A%2F%2Flaastras.herokuapp.com/laastras/social_media_share'
                client_secret = 'v3HxPvEu9UQTr93p'
                target_link = 'https://www.linkedin.com/oauth/v2/accessToken'
                url_link = "#{target_link}?grant_type=#{grant_type}&code=#{@authorization_code}&" + 
                           "redirect_uri=#{redirect_uri}&client_id=#{client_id}&client_secret=#{client_secret}"
                # get access token
                resp = ApplicationHelper.http_get(url_link, nil, logger) 
                if resp.nil?
                    @log_message = I18n.t 'post_to_linkedin_failed'
                    log_message = "social_media_share: get access token; resp is nil"
                    logger.debug log_message
                    @status = 'failure'
                else 
                    json_string = resp.body
                    logger.debug "social_media_share: access-token body: #{json_string}"
                    unless json_string.nil? || json_string.blank?
                        parsed = JSON.parse(json_string)
                        access_token = parsed['access_token']
                        logger.debug "social_media_share: access token: #{access_token}"
                        # get member id
                        custom_headers = {Authorization: "Bearer #{access_token}"}
                        url_link = "https://api.linkedin.com/v2/me"
                        resp = ApplicationHelper.http_get(url_link, custom_headers, logger)
                        if resp.nil?
                            @log_message = I18n.t 'post_to_linkedin_failed'
                            log_message = "social_media_share: get member id; resp is nil"
                            logger.debug log_message
                            @status = 'failure'
                        else
                            json_string = resp.body
                            logger.debug "social_media_share: member_id body: #{json_string}"
                            unless json_string.nil? || json_string.blank?
                                parsed = JSON.parse(json_string)
                                member_id = parsed['id']
                                # Now you can post
                                post_data = {
                                    author: "urn:li:person:#{member_id}",
                                    lifecycleState: 'PUBLISHED',
                                    specificContent: {
                                        'com.linkedin.ugc.ShareContent' => {
                                            'shareCommentary' => {
                                                'text' => (I18n.t 'opg_site_meta_description')
                                            },
                                            'shareMediaCategory' => 'ARTICLE',
                                            'media' => [
                                                {
                                                    'status' => 'READY',
                                                    'originalUrl' => @back_url
                                                }
                                            ]
                                        }
                                    },
                                    visibility: {
                                        'com.linkedin.ugc.MemberNetworkVisibility' => 'CONNECTIONS'
                                    }
                                }
                                custom_headers = {'X-Restli-Protocol-Version' => '2.0.0'}
                                url_link = 'https://api.linkedin.com/v2/ugcPosts'
                                resp = ApplicationHelper.http_post(url_link, custom_headers, post_data, logger)
                                unless resp.nil?
                                    case resp 
                                    when Net::HTTPSuccess then 
                                        @status = 'success'
                                        @log_message = I18n.t 'post_to_linkedin_succeeded'
                                    else
                                        @log_message = I18n.t 'post_to_linkedin_failed'
                                        log_message = "social_media_share: id => '#{member_id}'; #{resp}"
                                        logger.debug log_message
                                        @status = 'failure'
                                    end
                                else
                                    @log_message = I18n.t 'post_to_linkedin_failed'
                                    log_message = "social_media_share: id => '#{member_id}'; resp is nil"
                                    logger.debug log_message
                                    @status = 'failure'
                                end
                            else
                                @log_message = I18n.t 'post_to_linkedin_failed'
                                log_message = "social_media_share: response to '#{url_link}' is nil or blank. code => #{code}, back_url => #{@back_url}"
                                logger.debug log_message
                                @status = 'failure'
                            end
                        end
                    else
                        @log_message = I18n.t 'post_to_linkedin_failed'
                        log_message = "social_media_share: response to '#{url_link}' is nil or blank. code => #{code}, back_url => #{@back_url}"
                        logger.debug log_message
                        @status = 'failure'
                    end
                end
            else
                @log_message = I18n.t 'post_to_linkedin_failed'
                log_message = "social_media_share: code => #{code}, back_url => #{@back_url}"
                logger.debug log_message
                @status = 'failure'
            end
        else
            @log_message = I18n.t 'post_to_linkedin_failed'
            log_message = "social_media_share: code => #{code}, back_url => #{@back_url}"
            logger.debug log_message
            @status = 'failure'
        end

        [@back_url, @status, @log_message]

    end # share_to_linkedin
end
