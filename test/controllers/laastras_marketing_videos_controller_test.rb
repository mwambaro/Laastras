require "test_helper"

class LaastrasMarketingVideosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get laastras_marketing_videos_index_url
    assert_response :success
  end

  test "should get show" do
    get laastras_marketing_videos_show_url
    assert_response :success
  end

  test "should get show_video" do
    get laastras_marketing_videos_show_video_url
    assert_response :success
  end
end
