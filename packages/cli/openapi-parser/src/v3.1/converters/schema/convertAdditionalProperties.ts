import { PrimitiveSchemaValue, Schema } from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3_1 } from "openapi-types";
import { AbstractOpenAPIV3_1ParserContext } from "../../AbstractOpenAPIV3_1ParserContext";
import { isReferenceObject } from "../../utils/isReferenceObject";
import { convertSchema } from "../convertSchemas";

export function convertAdditionalProperties({
    breadcrumbs,
    additionalProperties,
    description,
    wrapAsNullable,
    context,
}: {
    breadcrumbs: string[];
    additionalProperties: boolean | OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject;
    description: string | undefined;
    wrapAsNullable: boolean;
    context: AbstractOpenAPIV3_1ParserContext;
}): Schema {
    if (typeof additionalProperties === "boolean" || isAdditionalPropertiesEmptyDictionary(additionalProperties)) {
        return wrapMap({
            wrapAsNullable,
            description,
            keySchema: PrimitiveSchemaValue.string({
                minLength: undefined,
                maxLength: undefined,
            }),
            valueSchema: Schema.unknown(),
        });
    }
    return wrapMap({
        wrapAsNullable,
        description,
        keySchema: PrimitiveSchemaValue.string({
            minLength: undefined,
            maxLength: undefined,
        }),
        valueSchema: convertSchema(additionalProperties, wrapAsNullable, context, [...breadcrumbs, "Value"]),
    });
}

function isAdditionalPropertiesEmptyDictionary(
    additionalProperties: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject
) {
    return !isReferenceObject(additionalProperties) && Object.keys(additionalProperties).length === 0;
}

export function wrapMap({
    keySchema,
    valueSchema,
    wrapAsNullable,
    description,
}: {
    keySchema: PrimitiveSchemaValue;
    valueSchema: Schema;
    wrapAsNullable: boolean;
    description: string | undefined;
}): Schema {
    if (wrapAsNullable) {
        return Schema.nullable({
            value: Schema.map({
                description,
                key: keySchema,
                value: valueSchema,
            }),
            description,
        });
    }
    return Schema.map({
        description,
        key: keySchema,
        value: valueSchema,
    });
}
