require "test_helper"

class SiteLanguagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @site_language = site_languages(:one)
  end

  test "should get index" do
    get site_languages_url
    assert_response :success
  end

  test "should get new" do
    get new_site_language_url
    assert_response :success
  end

  test "should create site_language" do
    assert_difference('SiteLanguage.count') do
      post site_languages_url, params: { site_language: { language: @site_language.language, user_browser: @site_language.user_browser, user_ip: @site_language.user_ip, user_session: @site_language.user_session } }
    end

    assert_redirected_to site_language_url(SiteLanguage.last)
  end

  test "should show site_language" do
    get site_language_url(@site_language)
    assert_response :success
  end

  test "should get edit" do
    get edit_site_language_url(@site_language)
    assert_response :success
  end

  test "should update site_language" do
    patch site_language_url(@site_language), params: { site_language: { language: @site_language.language, user_browser: @site_language.user_browser, user_ip: @site_language.user_ip, user_session: @site_language.user_session } }
    assert_redirected_to site_language_url(@site_language)
  end

  test "should destroy site_language" do
    assert_difference('SiteLanguage.count', -1) do
      delete site_language_url(@site_language)
    end

    assert_redirected_to site_languages_url
  end
end
