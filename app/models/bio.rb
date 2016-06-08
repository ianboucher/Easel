class Bio < ActiveRecord::Base
  # mount_uploader :filename, ImageUploader

  belongs_to :user
  has_many :images, as: :imageable
  accepts_nested_attributes_for :images
end
