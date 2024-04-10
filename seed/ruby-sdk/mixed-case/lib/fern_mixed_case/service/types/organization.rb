# frozen_string_literal: true

require "ostruct"
require "json"

module SeedMixedCaseClient
  class Service
    class Organization
      # @return [String]
      attr_reader :name
      # @return [OpenStruct] Additional properties unmapped to the current class definition
      attr_reader :additional_properties
      # @return [Object]
      attr_reader :_field_set
      protected :_field_set

      OMIT = Object.new

      # @param name [String]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [SeedMixedCaseClient::Service::Organization]
      def initialize(name:, additional_properties: nil)
        @name = name
        @additional_properties = additional_properties
        @_field_set = { "name": name }
      end

      # Deserialize a JSON object to an instance of Organization
      #
      # @param json_object [String]
      # @return [SeedMixedCaseClient::Service::Organization]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        name = struct["name"]
        new(name: name, additional_properties: struct)
      end

      # Serialize an instance of Organization to a JSON object
      #
      # @return [String]
      def to_json(*_args)
        @_field_set&.to_json
      end

      # Leveraged for Union-type generation, validate_raw attempts to parse the given
      #  hash and check each fields type against the current object's property
      #  definitions.
      #
      # @param obj [Object]
      # @return [Void]
      def self.validate_raw(obj:)
        obj.name.is_a?(String) != false || raise("Passed value for field obj.name is not the expected type, validation failed.")
      end
    end
  end
end
