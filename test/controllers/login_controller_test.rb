require "test_helper"

class LoginControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get login_index_url
    assert_response :success
  end

  test "should get logout" do
    get login_logout_url
    assert_response :success
  end

  test "should get check_credentials" do
    get login_check_credentials_url
    assert_response :success
  end
end
