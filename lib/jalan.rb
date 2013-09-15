module Jalan

	class API

		require 'nokogiri'

		def self.make

			conn = Faraday.new(:url => 'http://jws.jalan.net') do |builder|
				builder.request :url_encoded
				builder.response :logger
				builder.adapter :net_http
			end

			res = conn.get '/APIAdvance/StockSearch/V1/', {
				:key => 'cap14120256f0f',
				:s_area => '137412',
				:stay_date => '20131003',
				:stay_count => '3',
				:adult_num => '2',
				:count => '100'
			}

			Nokogiri::XML(res.body)

		end

	end

end