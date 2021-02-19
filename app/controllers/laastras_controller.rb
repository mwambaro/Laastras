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
    @contact_key = "Contact Us"
    @about_key = "about"
    @cookies_key = "cookies"
    @privacy_key = "privacy"
    @terms_of_use_key = "terms of use"
    @sign_up_key = "sign up"
    @sign_in_key = "sign in"
    @kick_off = "Kick off"
    @kick_off_url = "https://1drv.ms/u/s!Alpt4zgtrW4ug1ux6xHa5ls7Y1rm?e=sA3Qid"
    @copy_right = "#{Time.now.year} Laastras. All Rights Reserved."
    @globalization_intro = %Q(
      Meet globalization challenges and constraints by leveraging the power of Internet of our Things (IoT).
      Equality policy on global resources, Logistics, E-commerce, Leadership as a Service (LaaS),
      Communication as a Service (CaaS), and Legal Protection as a Service (PraaS) can turn malls, shops, 
      and market places into trans-shipment warehouses and divert manpower therein to actual production. 
      This IoT will then curb unemployment, poverty, and conflicts. Welcome to Laastras (LaaS trade system), 
      a collection of IoT services that lead to a world of plenty for all. Our money is Services Exchange, 
      on one side, and Virtual Money, on the other. We agree to disagree on everything else but one unrefutable 
      truth: We must equally share all resources that support our existence, present and future, discovered and 
      yet to be found. Laastras IoT collection of services offer the best policy to achieve that truth.
    ).gsub("\n", " ").gsub("\r", "")
  end
end
