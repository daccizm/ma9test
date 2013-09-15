class TopController < ApplicationController
  def index
  	@jalan = Jalan::API.make.css('Results Plan')

  end
end
