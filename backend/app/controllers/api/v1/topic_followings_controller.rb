class Api::V1::TopicFollowingsController < ApplicationController
  load_and_authorize_resource

  def show
    render json: @topic_following
  end

  def create
    if @topic_following.save
      render json: @topic_following, status: :updated
    else
      render json: { errors: @topic_following.errors }, status: :unprocessable_entity
    end
  end

  private

  def update_params
    params.require(:topic_following).permit(
      tag_ids: [], food_ids: [], symptom_ids: [], condition_ids: [], treatment_ids: []
    )
  end
end
