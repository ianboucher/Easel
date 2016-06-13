class Dashboard

  def initialize(user)
    @user = user
  end

  def listed_artworks
    @user.artworks.all
  end

  def purchased_artworks
    @user.purchases.artwork
  end

end
