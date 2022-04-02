require 'json'
require 'core_ext/string'

class ECommerceController < ApplicationController
  before_action :init_parameters

  def job_offer_posting
  end

  def real_estate_posting
  end

  def online_shopping_service
  end

  def sofware_solutions_service
  end

  def init_parameters
    @home_label = I18n.t 'home_label'
    @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
    @work_in_progress_label = I18n.t 'work_in_progress_label'
    @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
    @work_in_progress_description = I18n.t 'work_in_progress_description'
    if(!cookies.nil?)
      @active_language = ActiveLanguage.first(:session => cookies[:session_id])
      I18n.locale = @active_language.nil? ? I18n.locale : @active_language[:language].to_sym
    end
  end
end
