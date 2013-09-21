module Jalan

	class API

		require 'nokogiri'

		def self.make(opt)

			conn = Faraday.new(:url => 'http://jws.jalan.net') do |builder|
				builder.request :url_encoded
				builder.response :logger
				builder.adapter :net_http
			end

			xy = Jalan::DatumConvert.wgs842tokyo(opt[:x], opt[:y])

			res = conn.get '/APIAdvance/StockSearch/V1/', {
				:key => 'cap14120256f0f',
				:x => sprintf( "%09d", xy["lat"] ),
				:y => sprintf( "%09d", xy["lng"] ),
				:range => opt[:range],
				:stay_date => opt[:stay_date],
				:stay_count => opt[:stay_count],
				:adult_num => opt[:adult_num],
				:count => opt[:count]
			}

			Nokogiri::XML(res.body)

		end

	end

	class DatumConvert
		def DatumConvert::tokyo2wgs84(lat,lng)
			hash = Hash.new
			# 経度変換(日本測地系->世界測地系)
			hash["lat"] = lat - 0.000046038*lng - 0.000083043*lat + 0.010040

			# 緯度変換(日本測地系->世界測地系)
			hash["lng"] = lng - 0.00010695*lng + 0.000017464*lat + 0.0046017

			return hash
		end

		def DatumConvert::wgs842tokyo(lat,lng)
			hash = Hash.new
			# 経度変換(世界測地系->日本測地系)
			hash["lat"] = ( lat * 1.000083049 + lng * 0.000046047 - 0.010041046 ) * 3600 * 1000

			# 緯度変換(世界測地系->日本測地系)
			hash["lng"] = ( lng * 1.000106961 - lat * 0.000017467 - 0.004602017 ) * 3600 * 1000

			return hash
		end
	end
end