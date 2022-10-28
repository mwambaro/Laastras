require "test_helper"

class UserMailBoxesControllerTest < ActionDispatch::IntegrationTest
  test "should get send_mail" do
    get user_mail_boxes_send_mail_url
    assert_response :success
  end
end
