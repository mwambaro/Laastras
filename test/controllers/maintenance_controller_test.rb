require "test_helper"

class MaintenanceControllerTest < ActionDispatch::IntegrationTest
  test "should get fail_safe" do
    get maintenance_fail_safe_url
    assert_response :success
  end
end
