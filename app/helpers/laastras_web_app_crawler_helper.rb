module LaastrasWebAppCrawlerHelper
    class WebAppCrawler 
        def initialize(request=nil, app=nil, logger=nil)
            @logger = logger 
            @app = app
            @request = request
            @thread = nil
            @url_routes = {}
            @scanned_urls = []
            @root_file = "index-#{I18n.locale.to_s}.html"
            @verbose_queue = Queue.new

            if @logger.nil?
                @logger = ApplicationHelper::LaastrasLogger.new(
                    self.laastras_offline_files_path('laastras_offline_log.log')
                )
            end

        end # initialize

        def crawl 
            begin 
                @thread = Thread.new do 
                    self.scan_all_possible_routes 
                end
            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            @thread

        end # crawl

        def verbose_queue 
            @verbose_queue

        end # verbose_queue

        private

            def offline_root_path 
                folder_name = 'laastras_offline_app'
                path = Pathname.new(Rails.root.join('storage', folder_name))

            end # offline_root_path

            def laastras_offline_files_path(fname)
                of_path = self.offline_root_path
                unless of_path.exist?
                    of_path.mkpath
                end
                fpath = nil 
                if @root_file == fname 
                    fpath = of_path.join(fname)
                else
                    ipath_name = 'files'
                    ipath = Pathname.new(of_path.join(ipath_name))
                    unless ipath.exist?
                        ipath.mkpath
                    end
                    fpath = of_path.join(ipath_name, fname)
                end

                fpath

            end # laastras_offline_files_path

            def routes_path(fname)
                path = Pathname.new(Rails.root.join('config'))
                unless path.exist?
                    throw 'config folder is missing'
                end
                Rails.root.join('config', fname)

            end # routes_path

            def scan_all_possible_routes 
                begin
                    
                    @verbose_queue.push 'Scan for all possible routes ...'
                    path = self.routes_path 'routes.rb'
                    excludes = ['laastras_web_app_crawler', 'Rails.application.routes.draw']
                    regexp = Regexp.compile((excludes.each {|s| Regexp.escape(s)}).join('|'))

                    File.open(path, 'r') { |f|
                        while !f.eof? do
                            line = f.readline.gsub(/\A\s+|\s+\Z/, '')
                            next if line =~ regexp
                            next unless line =~ /\Aget|\Apost|\Aroot/i
                            # @verbose_queue.push line
                            @url_routes = {} if @url_routes.nil?
                            if line =~ /\Aget\s*(.+)\Z/i
                                url = $1.gsub(/'/, '')
                                @url_routes[:get] = [] if @url_routes[:get].nil?
                                @url_routes[:get] << url
                            elsif line =~ /\Apost\s*(.+)\Z/i
                                url = $1.gsub(/'/, '')
                                @url_routes[:post] = [] if @url_routes[:post].nil?
                                @url_routes[:post] << url
                            elsif line =~ /\Aroot\s*(.+)\Z/i
                                url = $1.gsub(/'/, '')
                                @url_routes[:root] = [] if @url_routes[:root].nil?
                                @url_routes[:root] << url 
                            else 
                                msg = "Unknown route [#{line}]"
                                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                            __method__.to_s + "--- " + msg 
                                @logger.debug message unless @logger.nil?
                            end
                            #@verbose_queue.push "OK"
                        end
                    }

                    @verbose_queue.push 'OK'

                    @url_routes[:get].each do |route| 
                        @verbose_queue.push "Translating route [#{route}] to url ..."
                        url = self.route_to_url route 
                        if url.nil? 
                            @verbose_queue.push 'FAILED'
                            next
                        end
                        @verbose_queue.push 'OK'
                        success = self.save_web_page url
                    end

                    @verbose_queue.push 'finished'

                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

            end # scan_all_possible_routes

            def route_to_url(route)
                url = nil
                begin 
                    if @request.nil?
                        throw 'We cannot resolve any route without the web app request'
                    end
                    url = @request.protocol + @request.host_with_port + '/' + route.split(/[\/#]/).join('/')
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

                url 

            end # route_to_url

            def canonize_url(url)
                uri = nil 
                begin 
                    if @request.nil?
                        throw 'We cannot canonize any url without the web app request'
                    end
                    u = URI.parse(url)
                    unless u.nil? 
                        if !u.host.nil? && !u.host.blank? && !u.port.nil? 
                            host_with_port = "#{u.host}:#{u.port}"
                            if @request.host_with_port =~ Regexp.compile(Regexp.escape(host_with_port))
                                uri = @request.protocol + @request.host_with_port + "#{u.path}"
                            end
                        else
                            uri = @request.protocol + @request.host_with_port + "#{u.path}"
                        end 
                    end
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

                uri 

            end # canonize_url

            def url_to_filename(url, root=false)
                filename = nil
                begin 
                    uri = URI.parse(url)
                    if root 
                        filename = "index-#{I18n.locale.to_s}.html"
                    else 
                        filename = uri.path.split(/\//i).join('_')
                        unless uri.query.nil?
                            filename += "_" + uri.query.split(/[&=%]/i).join('_')
                        end

                        filename = filename + "-#{I18n.locale.to_s}" unless filename.nil?

                        filename = "index-#{I18n.locale.to_s}.html" if filename.blank? || filename.nil?
                    end
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

                filename 

            end # url_to_filename

            def is_root_url(url)
                is = false
                unless @url_routes[:root].nil?
                    @url_routes[:root].each do |r|
                        root_url = self.route_to_url(r)
                        if root_url =~ Regexp.compile(Regexp.escape(url))
                            is = true
                        end
                    end
                end
                is 

            end # is_root_url

            def full_file_path(url)
                fname = self.url_to_filename(url)
                fpath = self.laastras_offline_files_path(fname)

            end # full_file_path

            def write_data_to_file(url, data, mode)
                success = false 
                begin 
                    p_data = data
                    @verbose_queue.push 'Getting urls from page ...'
                    in_data_text_urls, p_data = self.get_urls_from_data_text(data)

                    count = 0
                    in_data_text_urls.each do |i_url|
                        @verbose_queue.push 'OK' if count == 0
                        count += 1
                        c_url = self.canonize_url(i_url)
                        next if c_url.nil? || c_url.blank?
                        success = self.save_web_page(c_url)
                    end
                    @verbose_queue.push 'FAILED' if count == 0
                    # NOTE: Overriding any previous failures
                    
                    @verbose_queue.push 'Writing data to file ...'
                    fpath = self.full_file_path(url)
                    File.open(fpath, mode){|f| f.write(p_data)}
                    @verbose_queue.push 'OK'

                    @scanned_urls << url

                    success = true
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

                success 

            end # write_data_to_file

            def get_urls_from_data_text(data)
                urls = []
                p_data = data
                begin 
                    [
                        "href=\\&quot;", 
                        "src=\\&quot;"
                    ].each do |r|
                        regexp = Regexp.compile((Regexp.escape(r) + "([^;]+)"))
                        match = data.match(regexp)
                        # @logger.debug match.to_s if !@logger.nil? && !match.nil?
                        while match do 
                            url = match[1].sub('\&quot', '')
                            urls << url
                            s_data = match.post_match 
                            match = s_data.match(regexp)
                        end
                    end
                    
                    urls.each do |url|
                        fpath = self.full_file_path(url)
                        root_p = self.offline_root_path.to_path
                        path = fpath.sub(root_p.to_s, '')
                        p_data = p_data.sub(url, path)
                    end
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end
                
                return urls, p_data 

            end # get_urls_from_data_text

            def save_web_page(url)
                success = false 
                begin 
                    return true unless @scanned_urls.find_index(url).nil?

                    data = nil 
                    ftype = ""
                    if @app.nil?
                        @logger.debug "Reading #{url} ... " unless @logger.nil?
                        data = URI.open(url){|f| f.read}
                        @logger.debug "[DONE]" unless @logger.nil?
                        throw "Failed to read data from [#{url}]" if data.nil? || data.blank?
                    else
                        @verbose_queue.push "Fetching page: #{url} ..."
                        @app.get url
                        ftype = @app.response.headers['Content-Type']
                        data = @app.response.body
                        @verbose_queue.push 'OK'
                    end
                    
                    if ftype =~ /\Aimage/i
                        success = self.write_data_to_file(url, data, 'wb')
                    elsif ftype =~ /\Avideo/i
                        success = self.write_data_to_file(url, data, 'wb')
                    elsif ftype =~ /\Aapplication/i
                        success = self.write_data_to_file(url, data, 'wb')
                    elsif ftype =~ /\Atext/i
                        success = self.write_data_to_file(url, data, 'w')
                    else # unknown 
                        success = self.write_data_to_file(url, data, 'wb')
                    end

                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end
                
                success 

            end # save_web_page

    end # WebAppCrawler __class__ 

end # LaastrasWebAppCrawlerHelper __module__
