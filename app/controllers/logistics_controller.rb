require 'json'
require 'core_ext/string'

class LogisticsController < ApplicationController
  before_action :init_parameters

  def shipment_service
  end

  def bus_service
  end

  def cab_service
  end

  def bike_service
  end

  def init_parameters
    @home_label = I18n.t 'home_label'
    @founder_and_ceo_contact_email = 'mailto:onkezabahizi@gmail.com'
    @work_in_progress_label = I18n.t 'work_in_progress_label'
    @founder_and_ceo_contact_label = I18n.t 'founder_and_ceo_contact_label'
    @work_in_progress_description = I18n.t 'work_in_progress_description'
  end
end
