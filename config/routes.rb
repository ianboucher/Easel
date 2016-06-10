Rails.application.routes.draw do

  devise_for :users, controllers: { registrations: 'users/registrations' }

  resources :users, only: :show

  resources :bios

  resources :artworks

  resources :images, only: [:create, :destroy]

  authenticated :user do
    root 'users#show', as: :authenticated_root # change root for signed-in users
  end

  get 'welcome/about'

  root 'welcome#index'

end
