module LaastrasWebAppCrawlerHelper
    class WebAppCrawler 
        def initialize(app=nil, logger=nil)
            @logger = logger 
            @app = app
            @request = @app.request unless @app.nil?
            @threads = []
            @url_routes = {}
            @root_file = "index.html"
            @verbose_queue = Queue.new

            if @logger.nil?
                @logger = ApplicationHelper::LaastrasLogger.new(
                    self.laastras_offline_files_path('laastras_offline_log.log')
                )
            end

        end # initialize

        def crawl 
            thread = nil
            begin 
                thread = Thread.new do 
                    self.scan_all_possible_routes 
                end
            rescue Exception => e 
                message = Pathname.new(__FILE__).basename.to_s + "#" + 
                            __method__.to_s + "--- " + e.message 
                @logger.debug message unless @logger.nil?
            end

            thread

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

            def js_and_css_assets 
                success = true
                begin 
                    [
                        'bootstrap.min.css',
                        'bootstrap.min.css.map',
                        'bootstrap.min.js',
                        'bootstrap.min.js.map',
                        'jquery-3.6.0.min.js',
                        'prop-types.min.js',
                        'react-dom.production.min.js',
                        'react.production.min.js'
                    ].each do |f|
                        file = self.laastras_offline_files_path f 
                        unless File.exists? file 
                            success = false 
                            msg = "Asset file [#{f}] does not exist. You should have copied it to the root folder."
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

                success

            end # js_and_css_assets

            def images_assets 
                sucess = true
                begin 
                rescue Exception => e 
                    message = Pathname.new(__FILE__).basename.to_s + "#" + 
                                __method__.to_s + "--- " + e.message 
                    @logger.debug message unless @logger.nil?
                end

                success

            end # images_assets

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
                    host_with_port = u.host + ":" + u.port
                    if host_with_port =~ Regexp.compile(Regexp.escape(host_with_port))
                        uri = @request.protocol + @request.host_with_port + u.path
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
                        filename = "index.html"
                    else 
                        filename = uri.path.split(/\//i).join('_')
                        filename = "index.html" if filename.empty?
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
                    fpath = self.full_file_path(url)
                    File.open(fpath, mode){|f| f.write(data)}
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
                        "href=\&quot;", 
                        "src=\&quot;"
                    ].each do |r|
                        regexp = Regexp.compile((Regexp.escape(r) + "([^;]+)"))
                        match = data.match(regexp)
                        while match do 
                            url = match[1].sub('&quot', '')
                            urls << url
                            s_data = match.post_match 
                            match = s_data.match(regexp)
                        end
                    end
                    
                    urls.each do |url|
                        fpath = self.full_file_path(url)
                        path = fpath.sub(self.offline_root_path.to_s, '')
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
                    if @app.nil?
                        throw 'The app variable is not set.'
                    end

                    @verbose_queue.push "Fetching page: #{url} ..."
                    @app.get url
                    ftype = @app.response.headers['Content-Type']
                    data = @app.response.body
                    @verbose_queue.push 'OK'
                    
                    if ftype =~ /\Aimage/i
                        @verbose_queue.push 'Writing data to file ...'
                        success = self.write_data_to_file(url, data, 'wb')
                        if success 
                            @verbose_queue.push 'OK'
                        else 
                            @verbose_queue.push 'FAILED'
                        end
                    elsif ftype =~ /\Avideo/i
                        @verbose_queue.push 'Writing data to file ...'
                        success = self.write_data_to_file(url, data, 'wb')
                        if success 
                            @verbose_queue.push 'OK'
                        else 
                            @verbose_queue.push 'FAILED'
                        end
                    elsif ftype =~ /\Aapplication/i
                        @verbose_queue.push 'Writing data to file ...'
                        success = self.write_data_to_file(url, data, 'wb')
                        if success 
                            @verbose_queue.push 'OK'
                        else 
                            @verbose_queue.push 'FAILED'
                        end
                    elsif ftype =~ /\Atext/i
                        @verbose_queue.push 'Getting urls from page ...'
                        in_data_text_urls, p_data = self.get_urls_from_data_text(data)
                        @verbose_queue.push 'OK'

                        in_data_text_urls.each do |i_url|
                            c_url = self.canonize_url(i_url)
                            next if c_url.nil? || c_url.blank?
                            success = self.save_web_page(c_url)
                        end
                        # NOTE: Overriding any previous failures
                        @verbose_queue.push 'Writing data to file ...'
                        success = self.write_data_to_file(url, p_data, 'w')
                        if success 
                            @verbose_queue.push 'OK'
                        else 
                            @verbose_queue.push 'FAILED'
                        end
                    else # unknown 
                        throw "Unknown page type [#{url}]"
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
