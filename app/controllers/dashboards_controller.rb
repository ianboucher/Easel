class DashboardsController < ApplicationController

  def show
    @dashboard = Dashboard.new(current_user)
    @bio = current_user.bio
  end
end
