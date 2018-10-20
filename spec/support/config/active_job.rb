# frozen_string_literal: true

RSpec.configure do |config|
  config.around(:each, type: :request) do |example|
    ActiveJob::Base.queue_adapter = :inline

    example.run

    ActiveJob::Base.queue_adapter = :test
  end
end
