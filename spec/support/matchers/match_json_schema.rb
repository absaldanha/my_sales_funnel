# frozen_string_literal: true

RSpec::Matchers.define :match_json_schema do |schema|
  schema_path = "#{Dir.pwd}/spec/support/schemas/#{schema}.json"

  match do |json|
    JSON::Validator.validate(schema_path, json)
  end

  failure_message do |json|
    JSON::Validator.fully_validate(schema_path, json).to_sentence
  end
end
