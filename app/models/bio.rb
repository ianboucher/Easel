class Bio < ActiveRecord::Base
  belongs_to :user
  has_many :images, as: :imageable
  accepts_nested_attributes_for :images
  validates_uniqueness_of :user_id # how can I prevent users from making >1 bios?
end
