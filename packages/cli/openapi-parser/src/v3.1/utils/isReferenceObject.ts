import { OpenAPIV3_1 } from "openapi-types";

export function isReferenceObject(
    parameter:
        | OpenAPIV3_1.ReferenceObject
        | OpenAPIV3_1.ParameterObject
        | OpenAPIV3_1.SchemaObject
        | OpenAPIV3_1.RequestBodyObject
        | OpenAPIV3_1.SecuritySchemeObject
): parameter is OpenAPIV3_1.ReferenceObject {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (parameter as OpenAPIV3_1.ReferenceObject).$ref != null;
}
