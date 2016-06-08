class Bio < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  belongs_to :user
  has_many :images, as: :imageable
end
