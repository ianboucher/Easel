class Artwork < ActiveRecord::Base
  belongs_to :user
  has_many :images, as: :imageable
  has_many :purchases
  accepts_nested_attributes_for :images
end
