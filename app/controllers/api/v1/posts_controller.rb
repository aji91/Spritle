class Api::V1::PostsController < Api::V1::BaseController
  before_action :authenticate_user!

  def index
    RequestStore.store[:user] = @user
    posts = Post.includes(:likes, :comments)
    respone(true, posts.page(params[:page]).per(PAGE_COUNT).to_json(include: :user, methods: [:comments_count, :likes_count, :can_like, :liked]))
  end

  def show
    post = Post.find_by_id(params[:id])
    respone(true, post.to_json())
  end

  def create
    post = @user.posts.new(post_params)
    if post.save
      respone(true, post.to_json())
    else
      respone(false, {msg: post.errors.full_messages[0]})
    end
  end

  def update
    post = @user.posts.find_by_id(params[:id])
    if post.update_attributes(post_params)
      respone(true, post.to_json())
    else
      respone(false, {msg: post.errors.full_messages[0]})
    end
  end

  private

  def post_params
    params.require(:post).permit(
      :description,
      attachment_attributes: [:id, :image]
    )
  end
end