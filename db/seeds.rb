User.destroy_all

# Create users
usernames = ["Bert", "Ernie", "Calvin", "Hobbes"]
emails = ["bert@example.com", "ernie@example.com", "calvin@user.com", "hobbes@tiger.com"]

4.times do |i|
  User.create!(
  username: usernames[i],
  email:    emails[i],
  password: "password",
  confirmed_at: Time.now.utc
  )
end

User.create!(
username: "admin",
email:    "admin@example.com",
password: "password",
role:     2,
confirmed_at: Time.now.utc
)

users = User.all

image_urls = [
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/57048ccf-6ced-4636-bbe2-34225fa1bbf8/test1.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/2d143de9-3cd7-4286-a0ef-348593cbcbdc/test2.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/154679b9-457f-481b-afa0-1e8100b1fd3d/test3.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/86708278-ad1f-4822-8505-fb5d3cf51979/test4.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/438f58ea-3716-4fae-80ba-03eb2e22f7dd/test5.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/25673ece-293a-4c73-ae76-e53d5337696c/test6.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/d65a3ede-8215-4574-989e-8cd83b0df765/test7.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/9dd31de8-4c92-4846-900d-e63dedffb895/test8.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/ad17de77-07e0-4191-b61c-557ad6bc1d5b/test9.jpg",
"//s3easel.s3-eu-west-1.amazonaws.com/uploads/f5dd6c77-397e-443b-8c70-241f95f33c8d/test10.jpg"]


100.times do
  Artwork.create!(
  user: users.sample,
  title: Faker::Book.title,
  category: Faker::Book.genre,
  description: Faker::Lorem.sentence(10),
  price: Faker::Number.number(3),
  discount: nil
  )
end

artworks = Artwork.all

artworks.each do |artwork|
  artwork.images.create!(file: image_urls.sample, user_id: artwork.user_id)
end

p "#{users.count} users created"
p "#{artworks.count} artworks created"
