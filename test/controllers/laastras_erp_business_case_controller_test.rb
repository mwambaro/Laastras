require "test_helper"

class LaastrasErpBusinessCaseControllerTest < ActionDispatch::IntegrationTest
  test "should get erp_business_case" do
    get laastras_erp_business_case_erp_business_case_url
    assert_response :success
  end

  test "should get erp_implementation" do
    get laastras_erp_business_case_erp_implementation_url
    assert_response :success
  end

  test "should get erp_risks_and_pitfalls" do
    get laastras_erp_business_case_erp_risks_and_pitfalls_url
    assert_response :success
  end
end
