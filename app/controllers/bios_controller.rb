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
    # @bio = current_user.bio.new(bio_params) # why can't I do this? - undefined method 'new for NilClass'
    @bio = Bio.new(bio_params)
    @bio.user = current_user
    params[:bio][:images].each do |img|
      @bio.images.new(filename: img)
    end
    binding.pry
    if @bio.save!
      flash[:notice] = "Bio saved"
      redirect_to new_user_bio_path
    else
      flash[:alert] = "Error saving Bio"
      redirect_to new_user_bio_path
    end
  end

  def edit
  end

  private

  def bio_params
    params.require(:bio).permit(:name, :description, :statement, :info, :image, :user_id)
  end
end
