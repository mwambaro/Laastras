require "test_helper"

class ServicesControllerTest < ActionDispatch::IntegrationTest
  test "should get e_grocery" do
    get services_e_grocery_url
    assert_response :success
  end

  test "should get e_card" do
    get services_e_card_url
    assert_response :success
  end

  test "should get e_logistics" do
    get services_e_logistics_url
    assert_response :success
  end

  test "should get e_alliances" do
    get services_e_alliances_url
    assert_response :success
  end

  test "should get e_myth" do
    get services_e_myth_url
    assert_response :success
  end

  test "should get e_phylosophy" do
    get services_e_phylosophy_url
    assert_response :success
  end
end
