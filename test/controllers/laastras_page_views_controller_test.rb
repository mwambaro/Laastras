require "test_helper"

class LaastrasPageViewsControllerTest < ActionDispatch::IntegrationTest
  test "should get analytics" do
    get laastras_page_views_analytics_url
    assert_response :success
  end
end
