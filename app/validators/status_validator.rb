# frozen_string_literal: true

class StatusValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return unless record.status_changed? && record.status_was == "won"

    record.errors.add(attribute, "can't be changed to #{value}") unless value == "lost"
  end
end
