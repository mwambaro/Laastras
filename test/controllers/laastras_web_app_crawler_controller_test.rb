require "test_helper"

class LaastrasWebAppCrawlerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get laastras_web_app_crawler_index_url
    assert_response :success
  end
end
