class LaastrasMarketingVideo < ApplicationRecord
    validates_uniqueness_of :sha256
    validates_presence_of :sha256
    validates_uniqueness_of :title
    validates_presence_of :title
    validates_presence_of :uri
    validates_presence_of :mime_type
end
