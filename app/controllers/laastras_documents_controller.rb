require 'net/http'

class LaastrasDocumentsController < ApplicationController
    before_action :init_parameters

    def index_lsdoc 
        next_uri = nil 
        begin 
            @laastras_documents = []
            LaastrasDocument.all.each do |doc| 
                @laastras_documents << {
                    uri: url_for(
                        controller: 'laastras_documents',
                        action: 'show_laastras_document',
                        doc_id: doc.sha256
                    ),
                    filename: Pathname.new(doc.uri).basename.to_s
                }
            end

            if @laastras_documents.count == 0 
                session[:fail_safe_title] = I18n.t 'no_laastras_documents_available_title' 
                session[:fail_safe_message] = I18n.t 'no_laastras_documents_available_message'
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
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

    end # index_lsdoc

    def show_laastras_document
        next_uri = nil 
        begin 
            sha256 = params[:doc_id]

            failed = false
            unless sha256
                logger.debug 'No valid document id or hash was provided.' +  
                         'Make sure the request has a :doc_id query'
                failed = true
            else 
                doc = LaastrasDocument.find_by_sha256(sha256)
                if doc 
                    uri = doc.uri 
                    data = File.open(uri, 'rb'){ |io| io.read }
                    if data
                        fname = Pathname.new(uri).basename.to_s
                        options = ApplicationHelper.build_send_data_options(request, fname, doc.mime_type)

                        logger.debug '.... Sending file: ' + options[:filename] + 
                                 ', with mime type: ' + options[:type] +
                                 ', in data disposition: ' + options[:disposition]

                        send_data data, options
                    else 
                        logger.debug 'Failed to read data from file: ' + 
                                 Pathname.new(uri).basename.to_s
                        failed = true
                    end
                else 
                    logger.debug "Could not find document with ID: #{sha256}"
                    failed = true
                end
            end

            if failed 
                next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
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

    end # show_laastras_document

    def init_parameters 
        next_uri = nil 
        begin 
            I18n.locale = session[:active_language].to_sym unless session[:active_language].nil?
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
