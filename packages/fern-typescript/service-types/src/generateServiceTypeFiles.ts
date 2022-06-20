import { IntermediateRepresentation } from "@fern-api/api";
import { DependencyManager, TypeResolver } from "@fern-typescript/commons";
import { Directory } from "ts-morph";
import { generateHttpEndpointTypes } from "./http/generateHttpEndpointTypes";
import { HttpEndpointWithGeneratedTypes, ServicesWithGeneratedTypes } from "./types";

export function generateServiceTypeFiles({
    modelDirectory,
    intermediateRepresentation,
    typeResolver,
    dependencyManager,
}: {
    modelDirectory: Directory;
    intermediateRepresentation: IntermediateRepresentation;
    typeResolver: TypeResolver;
    dependencyManager: DependencyManager;
}): ServicesWithGeneratedTypes {
    const servicesWithGeneratedTypes: ServicesWithGeneratedTypes = {
        http: [],
        websocket: [],
    };

    for (const httpService of intermediateRepresentation.services.http) {
        const httpEndpointsWithGeneratedTypes: HttpEndpointWithGeneratedTypes[] = [];

        for (const endpoint of httpService.endpoints) {
            const generatedTypes = generateHttpEndpointTypes({
                serviceName: httpService.name,
                endpoint,
                endpointsDirectory,
                servicesDirectory,
                modelDirectory,
                typeResolver,
                dependencyManager,
            });
            httpEndpointsWithGeneratedTypes.push({
                generatedTypes,
            });
        }

        servicesWithGeneratedTypes.http.push({
            ...httpService,
            endpoints: httpEndpointsWithGeneratedTypes,
        });
    }

    return servicesWithGeneratedTypes;
}
