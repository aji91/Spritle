class Api::V1::LikesController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_post

  def index
    likes = @post.likes
    respone(true, likes.page(params[:page]).per(PAGE_COUNT).to_json(include: :user))
  end

  def create
    like = @post.likes.new(like_params)
    if like.save
      respone(true, like.to_json())
    else
      respone(false, {msg: like.errors.full_messages[0]})
    end
  end

  def update
    like = @post.likes.find_by_id(params[:id])
    if like.update_attributes(like_params)
      respone(true, like.to_json())
    else
      respone(false, {msg: like.errors.full_messages[0]})
    end
  end

  def destroy
    like = @post.likes.find_by_id(params[:id])
    if like.destroy.destroyed?
      respone(true)
    else
      respone(false)
    end
  end

  private

  def set_post
    @post = Post.find_by_id(params[:post_id])
  end

  def like_params
    params.require(:like).permit(:user_id)
  end
end