Rails.application.routes.draw do
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

  post 'laastras/locale'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
