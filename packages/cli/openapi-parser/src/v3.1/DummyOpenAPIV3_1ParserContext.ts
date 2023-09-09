import { TaskContext } from "@fern-api/task-context";
import { HttpError, SchemaId, StatusCode } from "@fern-fern/openapi-ir-model/ir";
import { OpenAPIV3_1 } from "openapi-types";
import { AbstractOpenAPIV3_1ParserContext, DiscriminatedUnionReference } from "./AbstractOpenAPIV3_1ParserContext";

export class DummyOpenAPIV3_1ParserContext extends AbstractOpenAPIV3_1ParserContext {
    constructor({ document, taskContext }: { document: OpenAPIV3_1.Document; taskContext: TaskContext }) {
        super({ document, taskContext, authHeaders: new Set() });
    }

    public markSchemaAsReferencedByNonRequest(_schemaId: SchemaId): void {
        return;
    }

    public markSchemaAsReferencedByRequest(_schemaId: SchemaId): void {
        return;
    }

    public getReferencedSchemas(): Set<SchemaId> {
        return new Set();
    }

    public markSchemaForStatusCode(
        _statusCode: number,
        _schema: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject
    ): void {
        return;
    }

    public markReferencedByDiscriminatedUnion(
        _schema: OpenAPIV3_1.ReferenceObject,
        _discrminant: string,
        _times: number
    ): void {
        return;
    }

    public getReferencesFromDiscriminatedUnion(
        _schema: OpenAPIV3_1.ReferenceObject
    ): DiscriminatedUnionReference | undefined {
        return undefined;
    }

    public getErrors(): Record<StatusCode, HttpError> {
        return {};
    }
}
