require 'sinatra'
require 'yajl'

require 'pry'

configure do 
  use Rack::Session::Cookie, secret: '123'

  disable :protection
  # set :protection, :except => [:http_origin]
  # use Rack::Protection::HttpOrigin, :origin_whitelist => ['http://127.0.0.1:9000']
end

helpers do 

  def login username, password
    if username == 'xislo'
      session[:user] = Time.now
    else
      nil
    end
  end

  def logout
    session[:user] = nil
  end

  def current_user
    @user ||= (session[:user].nil? ? nil : 1)
  end

  def logged_in? 
    !(current_user.nil?)
  end

  def to_json object
    Yajl::Encoder.encode object
  end
end

before /^\/api.*/ do 
  unless logged_in?
    halt 401, {'Content-Type' => 'application/json'}, to_json(status: 'nok')
  end
end

get '/' do
  erb :login
end

get '/login' do
  content_type :json
  
  to_json(status: 'ok')
end

post '/login' do
  content_type :json

  user  = params[:username]
  pwd   = params[:password]
  
  puts "username: #{user} | password: #{pwd}"

  if login(user, pwd)
    to_json(status: 'ok')
  else
    to_json(status: 'nok')
  end
end

get '/logout' do
  logout
  redirect '/'
end

get '/api/info' do
  content_type :json

  to_json(data: 'info')
end