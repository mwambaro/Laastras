require "test_helper"

class LaastrasControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get laastras_home_url
    assert_response :success
  end

  test "should get sign_in" do
    get laastras_sign_in_url
    assert_response :success
  end

  test "should get sign_up" do
    get laastras_sign_up_url
    assert_response :success
  end

  test "should get terms_of_use" do
    get laastras_terms_of_use_url
    assert_response :success
  end

  test "should get privacy" do
    get laastras_privacy_url
    assert_response :success
  end

  test "should get cookies" do
    get laastras_cookies_url
    assert_response :success
  end
end
