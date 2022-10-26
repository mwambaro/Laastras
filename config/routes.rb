Rails.application.routes.draw do
  get 'laastras_marketing_videos/index'
  get 'laastras_marketing_videos/show'
  get 'laastras_marketing_videos/show_video'
  get 'laastras_databases/download_copy'
  get 'laastras_databases/delete_copy'
  get 'laastras_mature_videos/index'
  get 'laastras_mature_videos/show'
  get 'laastras_mature_videos/show_video'
  get 'services/e_grocery'
  get 'services/e_card'
  get 'services/e_logistics'
  get 'services/e_alliances'
  get 'services/e_myth'
  get 'services/e_phylosophy'
  get 'laastras_job_seekers/fill_in_form'
  get 'laastras_job_seekers/show_jsk_doc'
  get 'laastras_job_seekers/show_jsk'
  get 'laastras_job_seekers/index_jsk'
  get 'laastras_job_seekers/evaluate'
  get 'laastras_job_offers/index'
  get 'laastras_job_offers/show'
  get 'laastras_job_offers/apply'
  get 'laastras_job_offers/close'
  get 'laastras_job_offers/feature'
  get 'laastras_job_offers/unfeature'
  get 'laastras_documents/show_laastras_document'
  get 'laastras_documents/index_lsdoc'
  get 'maintenance/fail_safe'
  get 'laastras_page_views/analytics'
  get 'money_transfer/payment_method'
  get 'money_transfer/payment_information'
  get 'money_transfer/receive_payment_information'
  get 'money_transfer/payment_review'
  get 'money_transfer/payment_confirmation'
  get 'money_transfer/donate'

  get 'users/index'
  get 'users/show'
  get 'users/profile_image_show'
  get 'users/edit'
  get 'users/destroy'
  get 'users/reset_password'
  get 'users/verify_email'
  
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
  get 'laastras/sign_out'
  get 'laastras/terms_of_use'
  get 'laastras/privacy'
  get 'laastras/cookies'
  get 'laastras/contact'
  get 'laastras/about'
  get 'laastras/web_stats'
  get 'laastras/social_media_share'

  post 'laastras/locale'
  post 'users/sign_up'
  post 'users/sign_in'
  post 'users/update'
  post 'users/profile_image_update'
  post 'laastras_job_seekers/store_form'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
