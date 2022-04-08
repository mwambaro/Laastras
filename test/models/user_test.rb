require "test_helper"

class UserTest < ActiveSupport::TestCase
    # test "the truth" do
    #   assert true
    # end
    def setup
        User.new(email: 'obed@gmail.com', password: 'well to go').save
    end

    def test_authenticate
        assert (User.authenticate('obed@gmail.com', 'well to go'))
        assert_nil (User.authenticate('obed@gmail.com', 'welltogo'))
        assert_nil (User.authenticate('frank@gmail.com', 'well to go'))
    end
end
