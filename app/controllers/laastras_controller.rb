require 'json'

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
    @kick_off_url = "https://1drv.ms/u/s!Alpt4zgtrW4ug1ux6xHa5ls7Y1rm?e=sA3Qid"
    @copy_right = "#{Time.now.year} #{I18n.t 'copy_right'}."
    @laastras_services = [
      (I18n.t 'iot'),
      (I18n.t 'means_of_exchange'),
      (I18n.t 'equality_policy'),
      (I18n.t 'logistics_ecommerce')
    ]
    @globalization_intro = (I18n.t 'mission_terms').gsub(/\t\n{0,1}/, " ").gsub(/[^\n]\n{1}[^\n]/, " ")
    @supported_languages = JSON.generate({
      en: (I18n.t 'english'),
      ru: (I18n.t 'kirundi'),
      fr: (I18n.t 'french'),
      sw: (I18n.t 'swahili')
    })
  end
end
