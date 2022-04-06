class SiteLanguagesController < ApplicationController
  before_action :set_site_language, only: %i[ show edit update destroy ]

  # GET /site_languages or /site_languages.json
  def index
    @site_languages = SiteLanguage.all
  end

  # GET /site_languages/1 or /site_languages/1.json
  def show
  end

  # GET /site_languages/new
  def new
    @site_language = SiteLanguage.new
  end

  # GET /site_languages/1/edit
  def edit
  end

  # POST /site_languages or /site_languages.json
  def create
    @site_language = SiteLanguage.new(site_language_params)

    respond_to do |format|
      if @site_language.save
        format.html { redirect_to @site_language, notice: "Site language was successfully created." }
        format.json { render :show, status: :created, location: @site_language }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @site_language.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /site_languages/1 or /site_languages/1.json
  def update
    respond_to do |format|
      if @site_language.update(site_language_params)
        format.html { redirect_to @site_language, notice: "Site language was successfully updated." }
        format.json { render :show, status: :ok, location: @site_language }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @site_language.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /site_languages/1 or /site_languages/1.json
  def destroy
    @site_language.destroy
    respond_to do |format|
      format.html { redirect_to site_languages_url, notice: "Site language was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_site_language
      @site_language = SiteLanguage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def site_language_params
      params.require(:site_language).permit(:language, :user_session, :user_ip, :user_browser)
    end
end
