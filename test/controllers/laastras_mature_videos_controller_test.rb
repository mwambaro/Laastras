require "test_helper"

class LaastrasMatureVideosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get laastras_mature_videos_index_url
    assert_response :success
  end

  test "should get show" do
    get laastras_mature_videos_show_url
    assert_response :success
  end
end
