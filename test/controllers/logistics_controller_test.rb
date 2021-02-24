require "test_helper"

class LogisticsControllerTest < ActionDispatch::IntegrationTest
  test "should get shipment_service" do
    get logistics_shipment_service_url
    assert_response :success
  end

  test "should get bus_service" do
    get logistics_bus_service_url
    assert_response :success
  end

  test "should get cab_service" do
    get logistics_cab_service_url
    assert_response :success
  end

  test "should get bike_service" do
    get logistics_bike_service_url
    assert_response :success
  end
end
