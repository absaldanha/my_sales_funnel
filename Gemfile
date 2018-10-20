# frozen_string_literal: true

source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.1"

gem "pg", "~> 1.1"
gem "puma", "~> 3.12"
gem "rack-cors", "~> 1.0"
gem "rails", "~> 5.2"
gem "wisper", "~> 2.0"

group :development, :test do
  gem "byebug", "~> 10.0", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails", "~> 2.5"
  gem "pry-byebug", "~> 3.6"
end

group :development do
  gem "listen", "~> 3.1"
end

group :test do
  gem "database_cleaner", "~> 1.7"
  gem "factory_bot_rails", "~> 4.11"
  gem "faker", "~> 1.9"
  gem "json-schema", "~> 2.8"
  gem "rspec-rails", "~> 3.8"
  gem "rubocop", "~> 0.59"
  gem "shoulda-matchers", "~> 3.1"
  gem "simplecov", "~> 0.16"
  gem "timecop", "~> 0.9"
end
