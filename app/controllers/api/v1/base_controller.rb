class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :destroy_session
  before_action :set_user, if: :current_user

  def destroy_session
    request.session_options[:skip] = true
  end

  def set_user
    @user = current_user
  end

  def respone(status,data=nil)
    render json: {
      success: status,
      data: (JSON.parse(data) if data)
    }
  end
end
