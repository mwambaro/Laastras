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
        @money_transfer_options = [
            'Western Union',
            'PayPal',
            'Payoneer',
            'Stripe'
        ]
    end
end
