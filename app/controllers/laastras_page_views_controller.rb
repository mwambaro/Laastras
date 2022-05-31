class LaastrasPageViewsController < ApplicationController
  before_action :init_parameters

  def analytics
      unless ApplicationHelper.user_has_admin_role?(session)
          redirect_to url_for(controller: 'laastras', action: 'home')
      end
      # Page Visits
      page_views_sql = "SELECT request_url, COUNT(*) AS number_of_visits FROM laastras_page_views GROUP BY request_url HAVING COUNT(*) > 0 ORDER BY number_of_visits DESC"
      @page_views = LaastrasPageView.find_by_sql(page_views_sql)
      # Page Visitors
      page_visitors_sql = "SELECT request_url, COUNT(DISTINCT ip_address) AS number_of_visitors FROM laastras_page_views GROUP BY request_url"
      @page_visitors = LaastrasPageView.find_by_sql(page_visitors_sql)
      # Processing
      @page_analytics = []
      @page_views.each do |page|
          request_url = page.request_url
          n_visits = page.number_of_visits
          n_visitors = 1
          @page_visitors.each do |v_page| 
              url = v_page.request_url
              if url == request_url
                  n_visitors = v_page.number_of_visitors
                  break
              end
          end
          @page_analytics << {
              page: request_url,
              number_of_visits: n_visits,
              number_of_visitors: n_visitors
          }
      end
  end

  def init_parameters
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
  end
end
