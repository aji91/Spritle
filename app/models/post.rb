class Post < ApplicationRecord
  belongs_to :user
  has_one :attachment
  has_many :comments
  has_many :likes

  accepts_nested_attributes_for :attachment

  default_scope { order(created_at: :desc) }

  def comments_count
  	comments.count
  end

  def likes_count
  	likes.count
  end

  def can_like
    user = RequestStore.store[:user]
    user_id != user.id
  end

  def liked
    user = RequestStore.store[:user]
    likes.find_by(user_id: user.id).present?
  end

  def my_like
    likes.find_by(user_id: user.id).try(:id)
  end
end
