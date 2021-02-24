require "test_helper"

class ECommerceControllerTest < ActionDispatch::IntegrationTest
  test "should get job_offer_posting" do
    get e_commerce_job_offer_posting_url
    assert_response :success
  end

  test "should get real_estate_posting" do
    get e_commerce_real_estate_posting_url
    assert_response :success
  end

  test "should get online_shopping_service" do
    get e_commerce_online_shopping_service_url
    assert_response :success
  end

  test "should get sofware_solutions_service" do
    get e_commerce_sofware_solutions_service_url
    assert_response :success
  end
end
