class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
  	@user = User.where(username: params[:username]).first
  	if @user && @user.authenticate(params[:password])
    session[:user_id] = @user.id
  		redirect_to plans_path
  	else
  		redirect_to plans_path
  	end
  end

  def destroy
    session.destroy
    redirect_to '/'
  end
end


