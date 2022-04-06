require "application_system_test_case"

class SiteLanguagesTest < ApplicationSystemTestCase
  setup do
    @site_language = site_languages(:one)
  end

  test "visiting the index" do
    visit site_languages_url
    assert_selector "h1", text: "Site Languages"
  end

  test "creating a Site language" do
    visit site_languages_url
    click_on "New Site Language"

    fill_in "Language", with: @site_language.language
    fill_in "User browser", with: @site_language.user_browser
    fill_in "User ip", with: @site_language.user_ip
    fill_in "User session", with: @site_language.user_session
    click_on "Create Site language"

    assert_text "Site language was successfully created"
    click_on "Back"
  end

  test "updating a Site language" do
    visit site_languages_url
    click_on "Edit", match: :first

    fill_in "Language", with: @site_language.language
    fill_in "User browser", with: @site_language.user_browser
    fill_in "User ip", with: @site_language.user_ip
    fill_in "User session", with: @site_language.user_session
    click_on "Update Site language"

    assert_text "Site language was successfully updated"
    click_on "Back"
  end

  test "destroying a Site language" do
    visit site_languages_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Site language was successfully destroyed"
  end
end
