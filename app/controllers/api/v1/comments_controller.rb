class Api::V1::CommentsController < Api::V1::BaseController
  before_action :authenticate_user!
  before_action :set_post

  def index
    comments = @post.comments
    respone(true, comments.page(params[:page]).per(PAGE_COUNT).to_json(include: :user))
  end

  def create
    comment = @post.comments.new(comment_params)
    if comment.save
      respone(true, comment.to_json())
    else
      respone(false, {msg: comment.errors.full_messages[0]})
    end
  end

  def update
    comment = @post.comments.find_by_id(params[:id])
    if comment.update_attributes(comment_params)
      respone(true, comment.to_json())
    else
      respone(false, {msg: comment.errors.full_messages[0]})
    end
  end

  private

  def set_post
    @post = Post.find_by_id(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(
      :description,
      :user_id,
      :parent_id
    )
  end
end