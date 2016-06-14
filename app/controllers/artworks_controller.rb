class ArtworksController < ApplicationController

  before_action :set_s3_direct_post, only: [:new, :edit, :create, :update]

  def index
    @artworks = Artwork.all
  end

  def show
    @artwork = Artwork.find(params[:id])
  end

  def new
    @artwork = Artwork.new
  end

  def create
    # binding.pry
    @artwork = current_user.artworks.new(artwork_params)
    # @artwork.images.new(file: params[:image_url], user_id: current_user.id)
    params[:image_url].each { |url| @artwork.images.new(file: url, user_id: current_user.id) }

    if @artwork.save!
      flash[:notice] = "Artwork saved successfully"
      redirect_to artwork_path(@artwork.id)
    else
      flash[:alert] = "There was an error saving your artwork."
      redirect_to new_artwork_path
    end
  end

  def edit
    @artwork = Artwork.find(params[:id])
  end

  def update
    @artwork = Artwork.find(params[:id])
    params[:image_url].each { |url| @artwork.images.new(file: url, user_id: current_user.id) } if params.has_key?('image_url')

    if @artwork.update(artwork_params)
      flash[:notice] = "Artwork saved successfully"
      redirect_to artwork_path
    else
      flash[:alert] = "There was an error saving your artwork."
      redirect_to new_artwork_path
    end
  end

  private

  def artwork_params
    params.require(:artwork).permit(:title, :category, :description, :price, :discount)
  end

  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}",
      success_action_status: '201', acl: 'public-read')
  end
end
