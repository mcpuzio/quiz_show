class PlansController < ApplicationController
	before_action :find_plan, only: [:show, :edit, :update, :destroy, :planOwner]
	before_action :planOwner, only: [:edit, :update, :destroy]

	def planOwner
		unless @plan.user_id == current_user.id
			flash[:notice] = 'Access Denied.'
			redirect_to plans_path
end
	end

	def index
		@plans = Plan.all.order("created_at DESC")
	end
	def show
	end
	def new
		@plan = current_user.plans.build
	end
	def create
		@plan = current_user.plans.build(plan_params)
		if @plan.save
			redirect_to @plan
		else
			render 'new'
		end
	end
	def edit

	end
	def update
		if @plan.update(plan_params)
			redirect_to @plan
		else
			render 'edit'
		end
	end
	def destroy
		@plan.destroy
			redirect_to root_path
	end
	private
	def find_plan
		@plan = Plan.find(params[:id])
	end
	def plan_params
		params.require(:plan).permit(:subject, :object, :strategy, :assessment, :cclink)
	end
 
end
