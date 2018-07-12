class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user!, except: [:check_current_user]

  def check_current_user
    if @user.present?
      render json: {
        status: true,
        user: JSON.parse(@user.to_json),
        user_id: @user.id,
      }
    else
      render json: { status: false, msg: 'Please login to continue.' }
    end
  end

  def upload_profile_image
    if @user.update_attributes(user_params)
      respone(true, @user.to_json())
    else
      respone(false)
    end
  end

  private

  def user_params
    params.require(:user).permit(:profile_image)
  end

end