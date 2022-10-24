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

    def password_sha=(sha)
        write_attribute('password', sha)
    end

    def self.authenticate(email, pwd, logger=nil)
        user_email = nil
        user = nil 
        begin 
            hashed_pwd = Digest::SHA1.hexdigest(pwd)
            #logger.debug "---> Hashed passwords: #{hashed_pwd} =? #{self.find_by_email(email).password}" unless logger.nil?
            user = self.find_by_email(email)
            unless user.nil?
                user_email = email
                equal = user.password == hashed_pwd
                logger.debug "---> equal: #{equal.to_s}" unless logger.nil?
                unless equal 
                    user = nil
                end
            end
        rescue Exception => e 
            message = Time.now.to_s + ": " + Pathname.new(__FILE__).basename.to_s + "#" + 
                    __method__.to_s + "--- " + e.message 
            logger.debug message unless logger.nil?
            next_uri = url_for(controller: 'maintenance', action: 'fail_safe')
        end

        return user, user_email
    end
end
