class UsersController < ApplicationController
  def index
  end

  def new
  	@user = User.new
  end

  def create
  	@user = User.new(user_params)
  	if @user.save
  		session[:user_id] = @user.id
  		redirect_to root_path
  	else
        redirect_to :back
  	end
  end

  def edit
  	@user = User.find(params[:id])
  end

  def update
  	@user = User.find(params[:id])
  	if @user.update_attributes(user_params)
  		redirect_to user_path(@user)
  	else
  		render 'new'
  	end
  end

  def show
  	@user = User.find(params[:id])
  end

  private

  def user_params
  params.require(:user).permit(:username, :email, :password)
	end

end
