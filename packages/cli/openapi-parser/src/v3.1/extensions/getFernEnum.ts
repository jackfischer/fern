import { OpenAPIV3_1 } from "openapi-types";
import { FernOpenAPIExtension } from "./fernExtensions";
import { getExtension } from "./getExtension";

export type FernEnumConfig = Record<string, { description?: string; name?: string }>;

export function getFernEnum(schema: OpenAPIV3_1.SchemaObject): FernEnumConfig | undefined {
    return getExtension<FernEnumConfig>(schema, FernOpenAPIExtension.FERN_ENUM);
}
