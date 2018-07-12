class ProfileImageUploader < CarrierWave::Uploader::Base
  storage :file
  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
  
  def cache_dir
    '/tmp/cache'
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
