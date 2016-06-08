class Image < ActiveRecord::Base
  belongs_to :user
  belongs_to :imageable, polymorphic: true
end
