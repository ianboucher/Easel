class BiosController < ApplicationController
  def index
    @bios = Bio.all
  end

  def show
    @bio = Bio.find(params[:id])
  end

  def new
    @bio = Bio.new
  end

  def create

    @bio = current_user.build_bio(bio_params) # syntax for has_one association
    params[:images].each { |img| @bio.images.new(file: img, user_id: current_user.id) }

    if @bio.save!
      flash[:notice] = "Bio saved"
      redirect_to bio_path(@bio)
    else
      flash[:alert] = "Error saving Bio"
      redirect_to new_bio_path
    end
  end

  def edit
    @bio = Bio.find(params[:id])
  end

  def update
    # binding.pry
    @bio = Bio.find(params[:id])
    params[:images].each { |img| @bio.images.new(file: img, user_id: current_user.id) } if params.has_key?('images')

    if @bio.update(bio_params)
      flash[:notice] = "Bio updated"
      redirect_to @bio
    else
      flash[:alert] = "Error updating bio"
      redirect_to edit_bio_path
    end
  end

  private

  def bio_params
    params.require(:bio).permit(:name, :description, :statement, :info, :user_id)
  end
end
