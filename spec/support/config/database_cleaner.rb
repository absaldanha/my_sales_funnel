# frozen_string_literal: true

require "database_cleaner"

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner[:active_record].strategy = :transaction
  end

  config.around(:each) do |example|
    strategy = example.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner[:active_record].strategy = strategy

    DatabaseCleaner.cleaning do
      example.run
    end
  end
end
