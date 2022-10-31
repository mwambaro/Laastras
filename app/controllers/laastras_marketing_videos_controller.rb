class LaastrasMarketingVideosController < ApplicationController
    before_action :init_parameters

    def index
        next_uri = nil 
        begin 
            videos = LaastrasMarketingVideo.all 
            if videos.count == 0 
                session[:fail_safe_title] = 'No Videos in Database'
                session[:fail_safe_message] = 'We could not find any videos in the database'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
            else 
                @videos = []
                videos.each do |video| 
                    @videos << {
                        view_url: url_for(
                            controller: 'laastras_marketing_videos', 
                            action: 'show_video', 
                            video_id: video.sha256
                        ),
                        download_url: url_for(
                            controller: 'laastras_marketing_videos', 
                            action: 'show_video', 
                            video_id: video.sha256,
                            disposition: 'attachment'
                        ),
                        show_url: url_for(
                            controller: 'laastras_marketing_videos', 
                            action: 'show', 
                            id: video.id
                        ),
                        mime_type: video.mime_type,
                        filename: Pathname.new(video.uri).basename.to_s
                    }
                end
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

    end # index

    def show
        next_uri = nil
        begin 
            id = params[:id]
            sha256 = params[:video_id]
            video = LaastrasMarketingVideo.find(id) 
            if video.nil? 
                video = LaastrasMarketingVideo.find_by_sha256 sha256
            end

            if video.nil? 
                session[:fail_safe_title] = 'No Valid Video Found'
                session[:fail_safe_message] = 'No valid video found with id: ' + id.to_s
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
            else 
                @video = {
                    view_url: url_for(
                        controller: 'laastras_marketing_videos', 
                        action: 'show_video', 
                        video_id: video.sha256
                    ),
                    download_url: url_for(
                        controller: 'laastras_marketing_videos', 
                        action: 'show_video', 
                        video_id: video.sha256,
                        disposition: 'attachment'
                    ),
                    mime_type: video.mime_type,
                    filename: Pathname.new(video.uri).basename.to_s
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

    end # show 

    def show_video 
        next_uri = nil
        begin 
            sha256 = params[:video_id]
            disposition = params[:disposition] || 'inline'
            if sha256.nil? || sha256.blank?
                session[:fail_safe_title] = 'No Valid Video Id'
                session[:fail_safe_message] = 'No valid video id was given in request'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
            else
                video = LaastrasMarketingVideo.find_by_sha256(sha256)
                if video.nil?
                    session[:fail_safe_title] = 'Video Not Found'
                    session[:fail_safe_message] = 'We could not find video with id: ' + sha256
                    next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                else
                    video_name = Pathname.new(video.uri).basename.to_s
                    data = File.open(video.uri, 'rb'){|io| io.read} 
                    if data.nil? 
                        session[:fail_safe_title] = 'Video Read Error'
                        session[:fail_safe_message] = 'We failed to read data for video: ' + video_name
                        next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
                    else 
                        mime_type = video.mime_type
                        send_data data, type: mime_type, disposition: disposition, filename: video_name
                    end
                end
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

    end # show_video

    def init_parameters 
        next_uri = nil 
        begin 
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
            ApplicationHelper.set_locale_from_request(request, logger, session)
            @site_title = "Laastras | #{params[:action]}"
            @laastras_banner_image = ApplicationHelper.banner_image_asset_url(
                request
            )
            @open_graph_proto_image_url = ApplicationHelper.banner_image_asset_url(
                request
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
end
