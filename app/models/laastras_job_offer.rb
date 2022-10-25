class LaastrasJobOffer < ApplicationRecord
    validates_uniqueness_of :title
    validates_presence_of :title 
    validates_uniqueness_of :sha256
    validates_presence_of :sha256
    validates_presence_of :language 
    validates_presence_of :description 
end
