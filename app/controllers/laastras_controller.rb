require 'json'
require 'core_ext/string'

class LaastrasController < ApplicationController
  before_action :init_parameters

  def home
    
  end

  def sign_in
    
  end

  def sign_up
    
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
    @contact_key = I18n.t 'contact_us'
    @about_key = I18n.t 'about'
    @cookies_key = I18n.t 'cookies'
    @privacy_key = I18n.t 'privacy'
    @terms_of_use_key = I18n.t 'terms_of_use'
    @sign_up_key = I18n.t 'sign_up'
    @sign_in_key = I18n.t 'sign_in'
    @kick_off = I18n.t 'kick_off'
    @mission = I18n.t 'mission'
    @services = I18n.t 'services'
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
      (I18n.t 'logistics_ecommerce')
    ]
    @globalization_intro = (I18n.t 'mission_terms').paragraphize
    @supported_languages = JSON.generate([
      {locale: 'en', language: (I18n.t 'english')},
      {locale: 'ru', language: (I18n.t 'kirundi')},
      {locale: 'fr', language: (I18n.t 'french')},
      {locale: 'sw', language: (I18n.t 'swahili')}
    ])
  end
end
