require "test_helper"

class LaastrasCrmStrategiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get laastras_crm_strategies_index_url
    assert_response :success
  end

  test "should get show" do
    get laastras_crm_strategies_show_url
    assert_response :success
  end
end
