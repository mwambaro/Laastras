require 'digest/sha1'

class User < ApplicationRecord
    validates_presence_of :email
    validates_uniqueness_of :email 
    validates_presence_of :password

    def password=(pwd)
        write_attribute('password', Digest::SHA1.hexdigest(pwd))
    end

    def self.authenticate(email, pwd)
        hashed_pwd = Digest::SHA1.hexdigest(pwd)
        user = self.find_by_email_and_password(email, hashed_pwd)
        return user
    end
end
