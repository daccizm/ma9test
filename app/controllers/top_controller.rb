# coding: utf-8

class TopController < ApplicationController
  def index
  end

  def availability
    opt = Hash.new
    opt[:x] = params[:hdn][:lng].to_f
    opt[:y] = params[:hdn][:lat].to_f
    opt[:range] = "10"
    opt[:stay_date] = Time.now.strftime("%Y%m%d")
    opt[:stay_count] = "1"
    opt[:adult_num] = "1"
    opt[:count] = "100"

    response = Jalan::API.make(opt)

    hotels = Hash.new

    Jalan::API.make(opt).css("Results Plan").each { |node| 
      hotel = hotels.fetch(node.css('HotelID').text, nil)
      unless hotel

        latLng = Jalan::DatumConvert.tokyo2wgs84(node.css('X').text.to_f / 1000 / 3600, node.css('Y').text.to_f / 1000 / 3600)

        hotel = Hash.new
        hotel["HotelName"] = node.css('HotelName').text
        hotel["HotelDetailURL"] = node.css('HotelDetailURL').text
        hotel["RoomName"] = node.css('RoomName').text
        hotel["Stock"] = node.css('Stock').text.empty? ? "10以上" : node.css('Stock').text
        hotel["Rate"] = node.css('Stay Date Rate').text
        hotel["X"] = latLng["lng"]
        hotel["Y"] = latLng["lat"]
        hotels[node.css('HotelID').text] = hotel
        next
      end
      if hotel["Rate"].to_i > node.css('Stay Date Rate').text.to_i
        hotel["Rate"] = node.css('Stay Date Rate').text
      end
    }

    @jalan = hotels

    respond_to do |format|
      format.js   { render action: "availability.js.erb" }
    end

  end
end
