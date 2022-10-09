require "test_helper"

class LaastrasJobSeekersControllerTest < ActionDispatch::IntegrationTest
  test "should get fill_in_form" do
    get laastras_job_seekers_fill_in_form_url
    assert_response :success
  end

  test "should get store_form" do
    get laastras_job_seekers_store_form_url
    assert_response :success
  end
end
