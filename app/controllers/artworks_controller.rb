class ArtworksController < ApplicationController

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
    params[:images].each { |img| @artwork.images.new(file: img, user_id: current_user.id) }

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
    params[:images].each { |img| @artwork.images.new(file: img, user_id: current_user.id) } if params.has_key?('images')

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
end
