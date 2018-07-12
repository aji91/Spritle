Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: "registrations",
    sessions: "sessions"
  }

  root to: 'application#angular'
  
  namespace :api do
    namespace :v1 do
    	resources :users, only: [] do
    		collection do
          get :check_current_user
        end
        member do
    			put :upload_profile_image
        end
        resources :posts, only: [:show, :index, :create, :update] do
          resources :comments, only: [:index, :create, :update] do
          end
        end
      end

    end
  end
end
