require 'json'
require 'core_ext/string'

class LaastrasController < ApplicationController
  before_action :init_parameters

  def home
    
  end

  def services
  end

  def hire_us
  end

  def donate
  end

  def sign_in
    
  end

  def sign_up
    
  end

  # See https://gist.github.com/mlanett/a31c340b132ddefa9cca
  # for HTTP status codes and symbols.
  def locale
    lc = params[:locale]
    lchash = nil
    data = nil
    options = {
      type: :json,
      disposition: 'inline',
      status: (Rack::Utils::SYMBOL_TO_STATUS_CODE[:ok])
    }

    begin

      if(lc.nil?)
      
        data = {
          code: '0',
          message: (I18n.t 'locale_set_no_locale_settings').paragraphize
        }
        #options[:status] = Rack::Utils::SYMBOL_TO_STATUS_CODE[:bad_request]

      else
        lchash = JSON.parse(lc)
        if(!lchash['locale'].blank?)
          I18n.locale = lchash['locale'].to_sym
          data = {
            code: '1',
            message: ((I18n.t 'locale_set_success').paragraphize + 
                   ": #{lchash['language']} (#{lchash['country']})")
          }
        else
          data = {
            code: '0',
            message: ((I18n.t 'locale_set_failure').paragraphize + 
                   ": #{lchash['language']} (#{lchash['country']})")
          }
          #options[:status] = Rack::Utils::SYMBOL_TO_STATUS_CODE[:not_acceptable]
        end
      end

    rescue I18n::InvalidLocale

      message = (I18n.t 'locale_set_failure').paragraphize
      if(!lchash.nil?)
        message += ": #{lchash['language']} (#{lchash['country']})"
      end

      data = {
        code: 0,
        message: message             
      }

    rescue Exception => e

      data = {
        code: 0,
        message: e.message
      }

    end
    # send data to caller
    render plain: JSON.generate(data) if(!data.nil?)
  end

  def terms_of_use
    
  end

  def privacy
    
  end

  def cookies
    
  end

  def about
    
  end

  def contact
    
  end

  def web_stats 
    @web_statistics = ApplicationHelper.web_stats_code
  end

  def init_parameters
    @action_name = params[:action].nil? ? '' : params[:action]
    @open_graph_proto_description = I18n.t 'opg_site_meta_description'
    @open_graph_proto_title = I18n.t 'opg_site_meta_title'
    @kick_off = I18n.t 'kick_off'
    @tap_click_image = I18n.t 'click_or_tap_image_text'
    @mission = I18n.t 'mission'
    @vision = I18n.t 'vision'
    @home_label = I18n.t 'home_label'
    @site_description = I18n.t 'site_meta_description'
    @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
    @work_in_progress_label = I18n.t 'work_in_progress_label'
    @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
    @work_in_progress_description = I18n.t 'work_in_progress_description'
    @site_title = 'Laastras | ' + @action_name
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
    @laastras_services = [
      {
        url: url_for(controller: 'e_commerce', action: 'job_offer_posting'),
        inner_text: (I18n.t 'job_offer_posting_label')
      },
      {
        url: url_for(controller: 'e_commerce', action: 'real_estate_posting'),
        inner_text: (I18n.t 'real_estate_posting_label')
      },
      {
        url: url_for(controller: 'e_commerce', action: 'online_shopping_service'),
        inner_text: (I18n.t 'online_shopping_label')
      },
      {
        url: url_for(controller: 'e_commerce', action: 'sofware_solutions_service'),
        inner_text: (I18n.t 'software_solutions_service_label')
      },
      {
        url: url_for(controller: 'logistics', action: 'shipment_service'),
        inner_text: (I18n.t 'shipment_service_label')
      },
      {
        url: url_for(controller: 'logistics', action: 'bus_service'),
        inner_text: (I18n.t 'bus_service_label')
      },
      {
        url: url_for(controller: 'logistics', action: 'cab_service'),
        inner_text: (I18n.t 'cab_service_label')
      },
      {
        url: url_for(controller: 'logistics', action: 'bike_service'),
        inner_text: (I18n.t 'bike_service_label')
      }
    ]
    @laastras_actions = [
      {
        url: url_for(controller: 'laastras', action: 'hire_us'),
        inner_text: (I18n.t 'hire_us_label'),
        dropdown_boolean: 'false',
        data: ''
      },
      {
        url: '',
        inner_text: (I18n.t 'services_label'),
        dropdown_boolean: 'true',
        data: @laastras_services
      },
      {
        url: url_for(controller: 'laastras', action: 'donate'),
        inner_text: (I18n.t 'donate_label'),
        dropdown_boolean: 'false',
        data: ''
      },
      {
        url: url_for(controller: 'laastras', action: 'sign_in'),
        inner_text: (I18n.t 'sign_in'),
        dropdown_boolean: 'false',
        data: ''
      },
      {
        url: url_for(controller: 'laastras', action: 'sign_up'),
        inner_text: (I18n.t 'sign_up'),
        dropdown_boolean: 'false',
        data: ''
      }
    ]
    @footer_actions = [
      {
        url: url_for(controller: 'laastras', action: 'about'),
        inner_text: (I18n.t 'about')
      },
      {
        url: url_for(controller: 'laastras', action: 'terms_of_use'),
        inner_text: (I18n.t 'terms_of_use')
      },
      {
        url: url_for(controller: 'laastras', action: 'privacy'),
        inner_text: (I18n.t 'privacy')
      },
      {
        url: url_for(controller: 'laastras', action: 'cookies'),
        inner_text: (I18n.t 'cookies')
      },
      {
        url: url_for(controller: 'laastras', action: 'contact'),
        inner_text: (I18n.t 'contact_us')
      }
    ]
    @social_media_data = {
      facebook: {
        href: 'https://laastras.herokuapp.com',
        hashtag: '#laas',
        quote: (I18n.t 'site_meta_description')
      }
    }
    @laastras_sample_services = [
      (I18n.t 'iot'),
      (I18n.t 'means_of_exchange'),
      (I18n.t 'equality_policy'),
      (I18n.t 'logistics_ecommerce'),
      (I18n.t 'aori_globalization')
    ]
    @globalization_intro = (I18n.t 'mission_terms').paragraphize
    @laastras_vision = (I18n.t 'vision_terms')
    @supported_languages = [
      {locale: 'en_US', language: (I18n.t 'english'), country: (I18n.t 'usa')},
      {locale: 'ru_BI', language: (I18n.t 'kirundi'), country: (I18n.t 'burundi')},
      {locale: 'lg_UG', language: (I18n.t 'luganda'), country: (I18n.t 'uganda')},
      {locale: 'fr_FR', language: (I18n.t 'french'), country: (I18n.t 'france')},
      {locale: 'sw_TZ', language: (I18n.t 'swahili'), country: (I18n.t 'tanzania')}
    ]

    #http://getwallpapers.com/wallpaper/full/f/9/0/838457-full-size-outdoors-wallpapers-1920x1200.jpg
    @site_background_image_url = ApplicationHelper.image_asset_url(
      request, '838457-default-background-image.jpg'
    )
  end
end
