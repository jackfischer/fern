import { PrimitiveSchema, PrimitiveSchemaValue } from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3_1 } from "openapi-types";
import { FernOpenAPIExtension } from "./fernExtensions";
import { getExtension } from "./getExtension";

export function getVariableDefinitions(document: OpenAPIV3_1.Document): Record<string, PrimitiveSchema> {
    const variables = getExtension<Record<string, OpenAPIV3_1.SchemaObject>>(
        document,
        FernOpenAPIExtension.SDK_VARIABLES
    );

    if (variables == null) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(variables).map(([variableName, schema]) => {
            if (schema.type === "string") {
                return [
                    variableName,
                    {
                        schema: PrimitiveSchemaValue.string({
                            minLength: undefined,
                            maxLength: undefined,
                        }),
                        description: schema.description,
                    },
                ];
            } else {
                throw new Error(`Variable ${variableName} has unsupported schema ${JSON.stringify(schema)}`);
            }
        })
    );
}
