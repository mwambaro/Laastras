require 'digest/sha1'

class User < ApplicationRecord
    validates_presence_of :email
    validates_uniqueness_of :email 
    validates_presence_of :password
    validates_presence_of :role
    validates_presence_of :first_name 
    validates_presence_of :last_name 
    validates_presence_of :user_name

    def password=(pwd)
        write_attribute('password', Digest::SHA1.hexdigest(pwd))
    end

    def self.authenticate(email, pwd)
        user_email = nil
        hashed_pwd = Digest::SHA1.hexdigest(pwd)
        user = self.find_by_email_and_password(email, hashed_pwd)

        if user.nil?
            user = self.find_by_email(email)
            if user 
                user_email = email
            end
        end

        return user, user_email
    end
end
