Rails.application.routes.draw do
  root 'laastras#home'
  
  get 'laastras/home'
  get 'laastras/sign_in'
  get 'laastras/sign_up'
  get 'laastras/terms_of_use'
  get 'laastras/privacy'
  get 'laastras/cookies'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
