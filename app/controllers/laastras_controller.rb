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

  def init_parameters
    @action_name = params[:action].nil? ? '' : params[:action]
    @contact_key = I18n.t 'contact_us'
    @about_key = I18n.t 'about'
    @cookies_key = I18n.t 'cookies'
    @privacy_key = I18n.t 'privacy'
    @terms_of_use_key = I18n.t 'terms_of_use'
    @sign_up_key = I18n.t 'sign_up'
    @sign_in_key = I18n.t 'sign_in'
    @kick_off = I18n.t 'kick_off'
    @mission = I18n.t 'mission'
    @home_label = I18n.t 'home_label'
    @services_label = I18n.t 'services_label'
    @donate_label = I18n.t 'donate_label'
    @hire_us_label = I18n.t 'hire_us_label'
    @site_description = I18n.t 'site_meta_description'
    @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
    @work_in_progress_label = I18n.t 'work_in_progress_label'
    @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
    @work_in_progress_description = I18n.t 'work_in_progress_description'
    @site_title = 'Laastras | ' + @action_name
    @mission_kick_off_data = JSON.generate([
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
    ])
    @copy_right = "#{Time.now.year} #{I18n.t 'copy_right'}."
    @laastras_services = [
      (I18n.t 'iot'),
      (I18n.t 'means_of_exchange'),
      (I18n.t 'equality_policy'),
      (I18n.t 'logistics_ecommerce'),
      (I18n.t 'aori_globalization')
    ]
    @globalization_intro = (I18n.t 'mission_terms').paragraphize
    @supported_languages = JSON.generate([
      {locale: 'en_US', language: (I18n.t 'english'), country: (I18n.t 'usa')},
      {locale: 'ru_BI', language: (I18n.t 'kirundi'), country: (I18n.t 'burundi')},
      {locale: 'fr_FR', language: (I18n.t 'french'), country: (I18n.t 'france')},
      {locale: 'sw_TZ', language: (I18n.t 'swahili'), country: (I18n.t 'tanzania')}
    ])
  end
end
