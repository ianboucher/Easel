FactoryGirl.define do
  factory :image do
    filename "MyString"
    imageable_type "MyString"
    imageable_id 1
    user nil
  end
end
