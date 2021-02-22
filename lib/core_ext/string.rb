
class String
    def paragraphize
        return self.gsub(/\t\n{0,1}/, " ").gsub(/[^\n]\n{1}[^\n]/, " ")
    end
end