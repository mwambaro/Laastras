class MoneyTransferController < ApplicationController
    before_action :init_parameters
    
    def payment_method
    end

    def payment_information
    end

    def receive_payment_information
    end

    def payment_review
    end

    def payment_confirmation
    end

    def init_parameters 
        ApplicationHelper.set_user_set_locale(session)
        @laastras_banner_image = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @open_graph_proto_image_url = ApplicationHelper.image_asset_url(
            request, 'Laastras-e-banner-lg.JPG'
        )
        @action_name = params[:action].nil? ? '' : params[:action]
        @money_transfer_options = [
            'Western Union',
            'PayPal',
            'Payoneer',
            'Stripe'
        ]
    end
end
