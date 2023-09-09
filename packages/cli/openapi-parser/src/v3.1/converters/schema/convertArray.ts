import { Schema } from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3_1 } from "openapi-types";
import { AbstractOpenAPIV3_1ParserContext } from "../../AbstractOpenAPIV3_1ParserContext";
import { convertSchema } from "../convertSchemas";

export function convertArray({
    breadcrumbs,
    item,
    description,
    wrapAsNullable,
    context,
}: {
    breadcrumbs: string[];
    item: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject | undefined;
    description: string | undefined;
    wrapAsNullable: boolean;
    context: AbstractOpenAPIV3_1ParserContext;
}): Schema {
    const itemSchema = item == null ? Schema.unknown() : convertSchema(item, false, context, [...breadcrumbs, "Item"]);
    return wrapArray({
        itemSchema,
        wrapAsNullable,
        description,
    });
}

export function wrapArray({
    itemSchema,
    wrapAsNullable,
    description,
}: {
    itemSchema: Schema;
    wrapAsNullable: boolean;
    description: string | undefined;
}): Schema {
    if (wrapAsNullable) {
        return Schema.nullable({
            value: Schema.array({
                value: itemSchema,
                description,
            }),
            description,
        });
    }
    return Schema.array({
        value: itemSchema,
        description,
    });
}
