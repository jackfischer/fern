import { Header, PathParameter, PrimitiveSchemaValue, QueryParameter, Schema } from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3 } from "openapi-types";
import { isReferenceObject } from "../../isReferenceObject";
import { convertSchema } from "../convertSchemas";

export interface ConvertedParameters {
    pathParameters: PathParameter[];
    queryParameters: QueryParameter[];
    headers: Header[];
}

export function convertParameters(
    parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
    document: OpenAPIV3.Document
): ConvertedParameters {
    const convertedParameters: ConvertedParameters = {
        pathParameters: [],
        queryParameters: [],
        headers: [],
    };
    for (const parameter of parameters) {
        const resolvedParameter = isReferenceObject(parameter)
            ? resolveParameterReference(parameter, document)
            : parameter;

        if (resolvedParameter == null) {
            throw new Error(`Failed to resolve parameter ${JSON.stringify(parameter)}`);
        }

        const isRequired = resolvedParameter.required ?? false;
        const schema =
            resolvedParameter.schema != null
                ? convertSchema(resolvedParameter.schema, !isRequired)
                : isRequired
                ? Schema.primitive({
                      schema: PrimitiveSchemaValue.string(),
                      description: resolvedParameter.description,
                  })
                : Schema.optional({
                      value: Schema.primitive({ schema: PrimitiveSchemaValue.string(), description: undefined }),
                      description: resolvedParameter.description,
                  });

        const convertedParameter = {
            name: resolvedParameter.name,
            schema,
            description: undefined,
        };
        if (resolvedParameter.in === "query") {
            convertedParameters.queryParameters.push(convertedParameter);
        } else if (resolvedParameter.in === "path") {
            convertedParameters.pathParameters.push(convertedParameter);
        } else if (resolvedParameter.in === "header") {
            convertedParameters.headers.push(convertedParameter);
        } else {
            throw new Error(`Doesn't support converting this path parameters: ${JSON.stringify(parameter)}`);
        }
    }
    return convertedParameters;
}

const PARAMETER_REFERENCE_PREFIX = "#/components/parameters/";

function resolveParameterReference(
    parameter: OpenAPIV3.ReferenceObject,
    document: OpenAPIV3.Document
): OpenAPIV3.ParameterObject | undefined {
    if (document.components == null || document.components.parameters == null) {
        return undefined;
    }
    if (!parameter.$ref.startsWith(PARAMETER_REFERENCE_PREFIX)) {
        return undefined;
    }
    const parameterKey = parameter.$ref.substring(PARAMETER_REFERENCE_PREFIX.length);
    const resolvedParameter = document.components.parameters[parameterKey];
    if (resolvedParameter == null) {
        return undefined;
    }
    if (isReferenceObject(resolvedParameter)) {
        return resolveParameterReference(resolvedParameter, document);
    }
    return resolvedParameter;
}
