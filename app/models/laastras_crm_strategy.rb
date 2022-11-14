class LaastrasCrmStrategy < ApplicationRecord
    validates_presence_of :laastras_crm_title
    validates_uniqueness_of :laastras_crm_title
    validates_presence_of :laastras_crm_description 
    validates_presence_of :language 
    validates_presence_of :sha256
end
