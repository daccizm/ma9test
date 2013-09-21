class TopController < ApplicationController
  def index
  	opt = Hash.new
  	opt[:x] = 34.702936
  	opt[:y] = 135.497807
  	# opt[:x] = 34702936
  	# opt[:y] = 135497807
  	opt[:range] = "10"
  	opt[:stay_date] = "20131001"
  	opt[:stay_count] = "1"
  	opt[:adult_num] = "1"
  	opt[:count] = "100"

  	# @jalan = Jalan::API.make(opt).css('Results')
  	@jalan = Jalan::API.make(opt)

  end

  def availability
  end
end
