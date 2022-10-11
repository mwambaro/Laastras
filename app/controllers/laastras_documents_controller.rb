require 'net/http'

class LaastrasDocumentsController < ApplicationController
    before_action :init_parameters, :seed 

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

                sql_query = "SELECT * FROM laastras_documents WHERE sha256 = '#{sha256}'"
                doc = LaastrasDocument.find_by_sql(sql_query).first
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
            @laastras_banner_image = ApplicationHelper.image_asset_url(
                request, 'Laastras-e-banner-lg.JPG'
            )
            @open_graph_proto_image_url = ApplicationHelper.image_asset_url(
                request, 'Laastras-e-banner-lg.JPG'
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

    def seed 
        next_uri = nil 
        begin
            # Have we seeded the database ?
            # We assume all went well first time we seeded.
            # Please, restart seeding from scratch if you add more files
            sha256 = '31AA643CFA2706D6C9B00AB8623652CEA848622095D4959C912FC36922F8E9C6'
            sql_query = "SELECT * FROM laastras_documents WHERE sha256 = '#{sha256}'"
            count = LaastrasDocument.find_by_sql(sql_query).count
            if count > 0 
                logger.debug '---> No need to seed laastras_documents database table. Looks already seeded'
                return nil
            end

            # Proceed
            docs = [
                {
                    sha256: '31AA643CFA2706D6C9B00AB8623652CEA848622095D4959C912FC36922F8E9C6',
                    title: 'Cover-Letter-Public-Relations__English',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Cover-Letter-Public-Relations__English.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '33C86A7C60B726707A257AD4FA50CADDF791D404EDED1FA73C016BCF71EF5436',
                    title: 'Cover-Letter-Public-Relations__English',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Cover-Letter-Public-Relations__English.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: '0C78F97D01415A3B8552DD6DDB7539195E823F635577E55A26E6D3A4B4C320A8',
                    title: 'Cover-Letter-Public-Relations__French',
                    language: 'fr_FR',
                    uri: ApplicationHelper.document_asset_url(
                        'Cover-Letter-Public-Relations__French.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: 'F05511B6E7F2586E9860ADE3160158F4ED85D28CA73A555ABB6AD102D1A89456',
                    title: 'Cover-Letter-Public-Relations__French',
                    language: 'fr_FR',
                    uri: ApplicationHelper.document_asset_url(
                        'Cover-Letter-Public-Relations__French.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: '1B69AA5A631E79BF6FA93863C03C122441E7A52DF11CC18A1F849F9A8757FE1B',
                    title: 'Job-Offer-Description',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Job-Offer-Description.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '7538F641ACE968A1B4046213847828D7C08F2B9DC34BD90D73CC0213BFACD1D6',
                    title: 'Job-Offer-Description',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Job-Offer-Description.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: '8B434CF7A7A658ED24BAD9CE0DFD308545E91921D2098DB736876F2CFE2C4790',
                    title: 'Laastras-organization-mission-book',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Laastras-organization-mission-book.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '001B6512DC363F772364FC7FE2E25D2BDF5E3125ECCCA57EB0DD8DA57E096739',
                    title: 'Laastras-organization-mission-book',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Laastras-organization-mission-book.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: 'B9C1999A86326E370ABF5C971A00EBE4FE2F75E4ED88A7992372909BD63A2B46',
                    title: 'Laastras-Specification',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Laastras-Specification.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '6B4064066E25B8201C7C2769D826089F67B0D3C1369DAEB1A2209FCFB6B8B09C',
                    title: 'Laastras-Specification',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'Laastras-Specification.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: '79B25BF32D33289C8D39CB656DA1BED6BADDD869DEC63B186A8C2AE69373DF98',
                    title: 'project-management-blue-print',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'project-management-blue-print.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '4FBAFE7D0A728FFFA6646FB2495FE8940830B253A1C9D7FE1859CE5080946850',
                    title: 'project-management-blue-print',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'project-management-blue-print.pdf'
                    ),
                    mime_type: 'application/pdf'
                },
                {
                    sha256: 'D2C5A22801A6E242B73B8B66C979DD708B970303A8ABCA6BC6213746DD7763A0',
                    title: 'README',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'README.docx'
                    ),
                    mime_type: 'application/docx'
                },
                {
                    sha256: '1C76F943B12FC398420ED4EA75DA567F1E77419E2772757DA85CA77B2580033C',
                    title: 'README',
                    language: 'en_US',
                    uri: ApplicationHelper.document_asset_url(
                        'README.pdf'
                    ),
                    mime_type: 'application/pdf'
                }
            ]

            docs.each do |doc| 
                document = LaastrasDocument.new({
                    sha256: doc[:sha256],
                    title: doc[:title],
                    language: doc[:language],
                    uri: doc[:uri],
                    mime_type: doc[:mime_type]
                })
                unless document.save
                    message = 'Failed to save document: ' + doc.sha256
                    msg = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + message
                            logger.debug msg
                    logger.debug msg
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

    end # seed
end
