Rails.application.routes.draw do
  get 'money_transfer/payment_method'
  get 'money_transfer/payment_information'
  get 'money_transfer/receive_payment_information'
  get 'money_transfer/payment_review'
  get 'money_transfer/payment_confirmation'
  get 'login/index'
  get 'login/logout'
  post 'login/check_credentials'
  resources :users
  resources :site_languages
  get 'logistics/shipment_service'
  get 'logistics/bus_service'
  get 'logistics/cab_service'
  get 'logistics/bike_service'
  get 'e_commerce/job_offer_posting'
  get 'e_commerce/real_estate_posting'
  get 'e_commerce/online_shopping_service'
  get 'e_commerce/sofware_solutions_service'
  root 'laastras#home'
  
  get 'laastras/home'
  get 'laastras/services'
  get 'laastras/hire_us'
  get 'laastras/donate'
  get 'laastras/sign_in'
  get 'laastras/sign_up'
  get 'laastras/terms_of_use'
  get 'laastras/privacy'
  get 'laastras/cookies'
  get 'laastras/contact'
  get 'laastras/about'
  get 'laastras/web_stats'
  get 'laastras/social_media_share'

  post 'laastras/locale'
  post 'users/sign_up'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
