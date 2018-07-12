class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable
  
  mount_uploader :profile_image, ProfileImageUploader

  has_many :posts, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  before_save :create_user_name

  def create_user_name
  	self.user_name = self.name.parameterize.underscore
  end
end
