require "test_helper"

class MoneyTransferControllerTest < ActionDispatch::IntegrationTest
  test "should get payment_method" do
    get money_transfer_payment_method_url
    assert_response :success
  end

  test "should get payment_information" do
    get money_transfer_payment_information_url
    assert_response :success
  end

  test "should get receive_payment_information" do
    get money_transfer_receive_payment_information_url
    assert_response :success
  end

  test "should get payment_review" do
    get money_transfer_payment_review_url
    assert_response :success
  end

  test "should get payment_confirmation" do
    get money_transfer_payment_confirmation_url
    assert_response :success
  end
end
