# frozen_string_literal: true

require "spec_helper"

ENV["RAILS_ENV"] ||= "test"

require File.expand_path("../config/environment", __dir__)

abort("The Rails environment is running in production mode!") if Rails.env.production?

require "rspec/rails"

Dir[Rails.root.join("spec/support/**/*.rb")].each { |file| require file }

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.use_transactional_fixtures = false

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!
  config.backtrace_exclusion_patterns = [/bundle/]

  config.include RequestHelpers, type: :request
end
