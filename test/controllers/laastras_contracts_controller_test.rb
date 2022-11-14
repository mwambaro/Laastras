require "test_helper"

class LaastrasContractsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get laastras_contracts_index_url
    assert_response :success
  end

  test "should get show" do
    get laastras_contracts_show_url
    assert_response :success
  end
end
