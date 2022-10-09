require "test_helper"

class LaastrasJobOffersControllerTest < ActionDispatch::IntegrationTest
  test "should get apply" do
    get laastras_job_offers_apply_url
    assert_response :success
  end
end
