class Attachment < ApplicationRecord
  belongs_to :post
  mount_uploader :image, ProfileImageUploader
end
