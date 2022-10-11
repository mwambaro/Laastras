class LaastrasJobSeeker < ApplicationRecord
    validates_presence_of :user_id
    validates_presence_of :job_offer_id
    validates_presence_of :location
    validates_presence_of :phone_number
    validates_presence_of :cv_uri
    validates_presence_of :cv_mime_type
    validates_presence_of :cover_letter_uri
    validates_presence_of :cover_letter_mime_type
end
