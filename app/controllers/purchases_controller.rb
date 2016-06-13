class PurchasesController < ApplicationController
  def new
    @artwork = Artwork.find(params[:id])
    @stripe_btn_data = {
      key: "#{ Rails.configuration.stripe[:publishable_key] }",
      description: "Artwork purchase: #{@artwork.title}",
      amount: @artwork.price
    }
  end

  def create
    @artwork = Artwork.find(params[:id])
    customer = Stripe::Customer.create(
      email: current_user.email,
      card: params[:stripeToken]
     )

    charge = Stripe::Charge.create(
      customer: customer.id,
      amount: @artwork.price, # TO-DO need to handle discount
      description: "Artwork purchase",
      currency: 'usd'
     )

    @purchase = Purchase.new(
      charge_id:  charge.id,
      amount:     charge.amount,
      user_id:    current_user.id,
      artwork_id: @artwork.id
     )

     if @purchase.save
       flash[:notice] = "Thank you for your payment"
       redirect_to artwork_path(@artwork)
     end

    rescue Stripe::CardError => e
     flash[:alert] = e.message
     redirect_to new_charge_path
  end
end
