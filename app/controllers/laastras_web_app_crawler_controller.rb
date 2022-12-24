class LaastrasWebAppCrawlerController < ApplicationController
    before_action :init_parameters

    def index 
    end # index

    def command
        data_to_send = nil
        begin 
            if session[:app_crawler].nil?
                session[:app_crawler] = LaastrasWebAppCrawlerHelper::WebAppCrawler.new(request)
            end 
            unless params[:command].nil? || params[:command].blank? 
                if self.supported_commands.find_index(params[:command]).nil?
                    message = "We could not recognize the command sent [#{params[:command]}]" +  
                                " or it is not supported. Supported commands: " + 
                                "#{self.supported_commands.join(', ')}"
                    data_to_send = {
                        code: 12,
                        message: message
                    }
                else
                    if params[:command].match?(/\Acrawl\Z/i)
                        if session[:crawl_thread].nil?
                            session[:crawl_thread] = session[:app_crawler].crawl
                            data_to_send = {
                                code: 15,
                                message: 'Crawling initiated successfully. You can now start issuing verbose commands.'
                            }
                        else
                            data_to_send = {
                                code: 7,
                                message: 'You must have already issued a crawl command. The server is running it. Please, bear up with us.'
                            }
                        end
                    elsif params[:command].match?(/\Averbose\Z/i)
                        message = session[:app_crawler].verbose_queue.pop 
                        if message.nil? || message.blank?
                            data_to_send = {
                                code: 20,
                                message: 'No verbose message yet. The engine must be running preparatory routines.'
                            }
                        elsif message.match?(/\AOK\Z/i)
                            data_to_send = {
                                code: 1,
                                message: message
                            }
                        elsif message.match?(/\AFAILED\Z/i)
                            data_to_send = {
                                code: 2,
                                message: message
                            }
                        elsif message.match?(/\AFINISHED\Z/i)
                            data_to_send = {
                                code: 3,
                                message: message
                            }
                        else
                            data_to_send = {
                                code: 0,
                                message: message
                            }
                        end
                    elsif params[:command].match?(/\Aexit\Z/i)
                        data_to_send = {
                            code: 33,
                            message: 'Exiting ...'
                        }
                    elsif params[:command].match?(/\Acrawl-exit\Z/i)
                        if session[:crawl_thread].nil?
                            data_to_send = {
                                code: 10,
                                message: 'We could not find any crawl operation running on our server. Please, send a crawl command first.'
                            }
                        else
                            session[:crawl_thread].exit
                            data_to_send = {
                                code: 18,
                                message: 'Crawl thread exited successfully. You can stop verbose commands.'
                            }
                        end
                    else
                        message = "We could not recognize the command sent [#{params[:command]}]" +  
                                    " or it is not supported. Supported commands: " + 
                                    "#{self.supported_commands.join(', ')}"
                        data_to_send = {
                            code: 12,
                            message: message
                        }
                    end
                end
            else
                data_to_send = {
                    code: 6,
                    message: 'No valid command sent from client. Please, revise your client-side code.'
                }
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            data_to_send = {
                code: 5,
                message: message
            }
        end

        # send data to caller
        render plain: JSON.generate(data_to_send) unless data_to_send.nil?

    end # command

    def supported_commands 
        [
            'crawl',
            'verbose',
            'crawl-exit',
            'exit'
        ]

    end # supported_commands

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
                request, 'Logo-e-laastras-ng.png'
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
