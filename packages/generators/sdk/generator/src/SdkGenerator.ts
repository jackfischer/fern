import { AbsoluteFilePath } from "@fern-api/fs-utils";
import { IntermediateRepresentation } from "@fern-fern/ir-model/ir";
import { GeneratorContext } from "@fern-typescript/contexts";
import { EndpointTypeSchemasGenerator } from "@fern-typescript/endpoint-type-schemas-generator";
import { EndpointTypesGenerator } from "@fern-typescript/endpoint-types-generator";
import { EnvironmentsGenerator } from "@fern-typescript/environments-generator";
import { ErrorGenerator } from "@fern-typescript/error-generator";
import { ErrorSchemaGenerator } from "@fern-typescript/error-schema-generator";
import { RequestWrapperGenerator } from "@fern-typescript/request-wrapper-generator";
import { ErrorResolver, ServiceResolver, TypeResolver } from "@fern-typescript/resolvers";
import { ServiceGenerator } from "@fern-typescript/service-generator";
import { TypeGenerator } from "@fern-typescript/type-generator";
import { TypeReferenceExampleGenerator } from "@fern-typescript/type-reference-example-generator";
import { TypeSchemaGenerator } from "@fern-typescript/type-schema-generator";
import { Volume } from "memfs/lib/volume";
import { Directory, Project, SourceFile } from "ts-morph";
import { EndpointTypeSchemasContextImpl } from "./contexts/EndpointTypeSchemasContextImpl";
import { EndpointTypesContextImpl } from "./contexts/EndpointTypesContextImpl";
import { EnvironmentsContextImpl } from "./contexts/EnvironmentsContextImpl";
import { ErrorContextImpl } from "./contexts/ErrorContextImpl";
import { ErrorSchemaContextImpl } from "./contexts/ErrorSchemaContextImpl";
import { RequestWrapperContextImpl } from "./contexts/RequestWrapperContextImpl";
import { ServiceContextImpl } from "./contexts/ServiceContextImpl";
import { TypeContextImpl } from "./contexts/TypeContextImpl";
import { TypeSchemaContextImpl } from "./contexts/TypeSchemaContextImpl";
import { CoreUtilitiesManager } from "./core-utilities/CoreUtilitiesManager";
import { EndpointDeclarationReferencer } from "./declaration-referencers/EndpointDeclarationReferencer";
import { EnvironmentEnumDeclarationReferencer } from "./declaration-referencers/EnvironmentEnumDeclarationReferencer";
import { ErrorDeclarationReferencer } from "./declaration-referencers/ErrorDeclarationReferencer";
import { RequestWrapperDeclarationReferencer } from "./declaration-referencers/RequestWrapperDeclarationReferencer";
import { ServiceDeclarationReferencer } from "./declaration-referencers/ServiceDeclarationReferencer";
import { TypeDeclarationReferencer } from "./declaration-referencers/TypeDeclarationReferencer";
import { DependencyManager } from "./dependency-manager/DependencyManager";
import {
    convertExportedFilePathToFilePath,
    ExportedDirectory,
    ExportedFilePath,
} from "./exports-manager/ExportedFilePath";
import { ExportsManager } from "./exports-manager/ExportsManager";
import { generateTypeScriptProject } from "./generate-ts-project/generateTypeScriptProject";
import { ImportsManager } from "./imports-manager/ImportsManager";

const FILE_HEADER = `/**
 * This file was auto-generated by Fern from our API Definition.
 */
`;

export declare namespace SdkGenerator {
    export interface Init {
        apiName: string;
        intermediateRepresentation: IntermediateRepresentation;
        context: GeneratorContext;
        volume: Volume;
        packageName: string;
        packageVersion: string | undefined;
        repositoryUrl: string | undefined;
        config: Config;
    }

    export interface Config {
        shouldUseBrandedStringAliases: boolean;
        isPackagePrivate: boolean;
    }
}

export class SdkGenerator {
    private context: GeneratorContext;
    private intermediateRepresentation: IntermediateRepresentation;

    private rootDirectory: Directory;
    private exportsManager: ExportsManager;
    private dependencyManager = new DependencyManager();
    private coreUtilitiesManager: CoreUtilitiesManager;
    private typeResolver: TypeResolver;
    private errorResolver: ErrorResolver;
    private serviceResolver: ServiceResolver;

    private typeDeclarationReferencer: TypeDeclarationReferencer;
    private typeSchemaDeclarationReferencer: TypeDeclarationReferencer;
    private errorDeclarationReferencer: ErrorDeclarationReferencer;
    private errorSchemaDeclarationReferencer: ErrorDeclarationReferencer;
    private serviceDeclarationReferencer: ServiceDeclarationReferencer;
    private endpointDeclarationReferencer: EndpointDeclarationReferencer;
    private requestWrapperDeclarationReferencer: RequestWrapperDeclarationReferencer;
    private endpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
    private environmentsEnumDeclarationReferencer: EnvironmentEnumDeclarationReferencer;

    private typeGenerator: TypeGenerator;
    private typeSchemaGenerator: TypeSchemaGenerator;
    private typeReferenceExampleGenerator: TypeReferenceExampleGenerator;
    private errorGenerator: ErrorGenerator;
    private errorSchemaGenerator: ErrorSchemaGenerator;
    private endpointTypesGenerator: EndpointTypesGenerator;
    private requestWrapperGenerator: RequestWrapperGenerator;
    private endpointTypeSchemasGenerator: EndpointTypeSchemasGenerator;
    private environmentsGenerator: EnvironmentsGenerator;
    private serviceGenerator: ServiceGenerator;

    private generatePackage: () => Promise<void>;

    constructor({
        apiName,
        intermediateRepresentation,
        context,
        volume,
        packageName,
        packageVersion,
        repositoryUrl,
        config,
    }: SdkGenerator.Init) {
        this.context = context;
        this.intermediateRepresentation = intermediateRepresentation;

        this.exportsManager = new ExportsManager({ packageName });
        this.coreUtilitiesManager = new CoreUtilitiesManager({ apiName, packageName });

        const project = new Project({
            useInMemoryFileSystem: true,
        });
        this.rootDirectory = project.createDirectory("/");
        this.typeResolver = new TypeResolver(intermediateRepresentation);
        this.errorResolver = new ErrorResolver(intermediateRepresentation);
        this.serviceResolver = new ServiceResolver(intermediateRepresentation);

        const apiDirectory: ExportedDirectory[] = [
            {
                nameOnDisk: "resources",
                exportDeclaration: { namespaceExport: apiName },
            },
        ];

        const schemaDirectory: ExportedDirectory[] = [
            {
                nameOnDisk: "serialization",
            },
        ];

        this.typeDeclarationReferencer = new TypeDeclarationReferencer({
            containingDirectory: apiDirectory,
            packageName,
        });
        this.typeSchemaDeclarationReferencer = new TypeDeclarationReferencer({
            containingDirectory: schemaDirectory,
            packageName,
        });
        this.errorDeclarationReferencer = new ErrorDeclarationReferencer({
            containingDirectory: apiDirectory,
            packageName,
        });
        this.errorSchemaDeclarationReferencer = new ErrorDeclarationReferencer({
            containingDirectory: schemaDirectory,
            packageName,
        });
        this.serviceDeclarationReferencer = new ServiceDeclarationReferencer({
            apiName,
            containingDirectory: apiDirectory,
            packageName,
        });
        this.endpointDeclarationReferencer = new EndpointDeclarationReferencer({
            containingDirectory: apiDirectory,
            packageName,
        });
        this.requestWrapperDeclarationReferencer = new RequestWrapperDeclarationReferencer({
            containingDirectory: apiDirectory,
            packageName,
        });
        this.endpointSchemaDeclarationReferencer = new EndpointDeclarationReferencer({
            containingDirectory: schemaDirectory,
            packageName,
        });
        this.environmentsEnumDeclarationReferencer = new EnvironmentEnumDeclarationReferencer({
            containingDirectory: [],
            packageName,
        });

        this.typeGenerator = new TypeGenerator({ useBrandedStringAliases: config.shouldUseBrandedStringAliases });
        this.typeSchemaGenerator = new TypeSchemaGenerator();
        this.typeReferenceExampleGenerator = new TypeReferenceExampleGenerator();
        this.errorGenerator = new ErrorGenerator({ useBrandedStringAliases: config.shouldUseBrandedStringAliases });
        this.errorSchemaGenerator = new ErrorSchemaGenerator();
        this.endpointTypesGenerator = new EndpointTypesGenerator({
            errorResolver: this.errorResolver,
            intermediateRepresentation,
        });
        this.endpointTypeSchemasGenerator = new EndpointTypeSchemasGenerator({
            errorResolver: this.errorResolver,
            intermediateRepresentation,
        });
        this.requestWrapperGenerator = new RequestWrapperGenerator();
        this.environmentsGenerator = new EnvironmentsGenerator();
        this.serviceGenerator = new ServiceGenerator({
            intermediateRepresentation: this.intermediateRepresentation,
            errorResolver: this.errorResolver,
        });

        this.generatePackage = async () => {
            await generateTypeScriptProject({
                volume,
                packageName,
                packageVersion,
                isPackagePrivate: config.isPackagePrivate,
                project,
                dependencies: this.dependencyManager.getDependencies(),
                repositoryUrl,
            });
        };
    }

    public async generate(): Promise<void> {
        this.generateTypeDeclarations();
        this.generateTypeSchemas();
        this.generateErrorDeclarations();
        this.generateErrorSchemas();
        this.generateEndpointTypes();
        this.generateEndpointTypeSchemas();
        this.generateServiceDeclarations();
        this.generateEnvironments();
        this.coreUtilitiesManager.finalize(this.exportsManager, this.dependencyManager);
        this.exportsManager.writeExportsToProject(this.rootDirectory);
        await this.generatePackage();
    }

    public async copyCoreUtilities({ pathToPackage }: { pathToPackage: AbsoluteFilePath }): Promise<void> {
        await this.coreUtilitiesManager.copyCoreUtilities({ pathToPackage });
    }

    private generateTypeDeclarations() {
        for (const typeDeclaration of this.intermediateRepresentation.types) {
            this.withSourceFile({
                filepath: this.typeDeclarationReferencer.getExportedFilepath(typeDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const typeContext = new TypeContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constantsV2,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                    });
                    typeContext.type.getGeneratedType(typeDeclaration.name).writeToFile(typeContext);
                },
            });
        }
    }

    private generateTypeSchemas() {
        for (const typeDeclaration of this.intermediateRepresentation.types) {
            this.withSourceFile({
                filepath: this.typeSchemaDeclarationReferencer.getExportedFilepath(typeDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const typeSchemaContext = new TypeSchemaContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constantsV2,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                    });
                    typeSchemaContext.typeSchema
                        .getGeneratedTypeSchema(typeDeclaration.name)
                        .writeToFile(typeSchemaContext);
                },
            });
        }
    }

    private generateErrorDeclarations() {
        for (const errorDeclaration of this.intermediateRepresentation.errors) {
            this.withSourceFile({
                filepath: this.errorDeclarationReferencer.getExportedFilepath(errorDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const errorContext = new ErrorContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constantsV2,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        errorGenerator: this.errorGenerator,
                        errorResolver: this.errorResolver,
                    });
                    errorContext.error.getGeneratedError(errorDeclaration.name)?.writeToFile(errorContext);
                },
            });
        }
    }

    private generateErrorSchemas() {
        for (const errorDeclaration of this.intermediateRepresentation.errors) {
            this.withSourceFile({
                filepath: this.errorSchemaDeclarationReferencer.getExportedFilepath(errorDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const errorSchemaContext = new ErrorSchemaContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constantsV2,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        errorGenerator: this.errorGenerator,
                        errorResolver: this.errorResolver,
                        typeGenerator: this.typeGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        errorSchemaDeclarationReferencer: this.errorSchemaDeclarationReferencer,
                        errorSchemaGenerator: this.errorSchemaGenerator,
                    });
                    errorSchemaContext.errorSchema
                        .getGeneratedErrorSchema(errorDeclaration.name)
                        ?.writeToFile(errorSchemaContext);
                },
            });
        }
    }

    private generateEndpointTypes() {
        for (const service of this.intermediateRepresentation.services.http) {
            for (const endpoint of service.endpoints) {
                this.withSourceFile({
                    filepath: this.endpointDeclarationReferencer.getExportedFilepath({
                        serviceName: service.name,
                        endpoint,
                    }),
                    run: ({ sourceFile, importsManager }) => {
                        const endpointTypesContext = new EndpointTypesContextImpl({
                            sourceFile,
                            coreUtilitiesManager: this.coreUtilitiesManager,
                            dependencyManager: this.dependencyManager,
                            fernConstants: this.intermediateRepresentation.constantsV2,
                            importsManager,
                            typeResolver: this.typeResolver,
                            typeDeclarationReferencer: this.typeDeclarationReferencer,
                            typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                            errorDeclarationReferencer: this.errorDeclarationReferencer,
                            endpointDeclarationReferencer: this.endpointDeclarationReferencer,
                            errorGenerator: this.errorGenerator,
                            errorResolver: this.errorResolver,
                            typeGenerator: this.typeGenerator,
                            serviceResolver: this.serviceResolver,
                            endpointTypesGenerator: this.endpointTypesGenerator,
                        });
                        endpointTypesContext.endpointTypes
                            .getGeneratedEndpointTypes(service.name, endpoint.id)
                            .writeToFile(endpointTypesContext);
                    },
                });
                if (endpoint.sdkRequest?.shape.type === "wrapper") {
                    this.withSourceFile({
                        filepath: this.requestWrapperDeclarationReferencer.getExportedFilepath({
                            serviceName: service.name,
                            endpoint,
                        }),
                        run: ({ sourceFile, importsManager }) => {
                            const context = new RequestWrapperContextImpl({
                                sourceFile,
                                coreUtilitiesManager: this.coreUtilitiesManager,
                                dependencyManager: this.dependencyManager,
                                fernConstants: this.intermediateRepresentation.constantsV2,
                                importsManager,
                                typeResolver: this.typeResolver,
                                typeDeclarationReferencer: this.typeDeclarationReferencer,
                                typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                                typeGenerator: this.typeGenerator,
                                errorDeclarationReferencer: this.errorDeclarationReferencer,
                                errorGenerator: this.errorGenerator,
                                errorResolver: this.errorResolver,
                                serviceResolver: this.serviceResolver,
                                endpointDeclarationReferencer: this.endpointDeclarationReferencer,
                                endpointTypesGenerator: this.endpointTypesGenerator,
                                requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                                requestWrapperGenerator: this.requestWrapperGenerator,
                            });
                            context.requestWrapper
                                .getGeneratedRequestWrapper(service.name, endpoint.id)
                                .writeToFile(context);
                        },
                    });
                }
            }
        }
    }

    private generateEndpointTypeSchemas() {
        for (const service of this.intermediateRepresentation.services.http) {
            for (const endpoint of service.endpoints) {
                this.withSourceFile({
                    filepath: this.endpointSchemaDeclarationReferencer.getExportedFilepath({
                        serviceName: service.name,
                        endpoint,
                    }),
                    run: ({ sourceFile, importsManager }) => {
                        const endpointTypeSchemasContext = new EndpointTypeSchemasContextImpl({
                            sourceFile,
                            coreUtilitiesManager: this.coreUtilitiesManager,
                            dependencyManager: this.dependencyManager,
                            fernConstants: this.intermediateRepresentation.constantsV2,
                            importsManager,
                            typeResolver: this.typeResolver,
                            typeDeclarationReferencer: this.typeDeclarationReferencer,
                            typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                            typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                            errorDeclarationReferencer: this.errorDeclarationReferencer,
                            errorSchemaDeclarationReferencer: this.errorSchemaDeclarationReferencer,
                            endpointSchemaDeclarationReferencer: this.endpointSchemaDeclarationReferencer,
                            endpointDeclarationReferencer: this.endpointDeclarationReferencer,
                            endpointTypesGenerator: this.endpointTypesGenerator,
                            requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                            requestWrapperGenerator: this.requestWrapperGenerator,
                            typeGenerator: this.typeGenerator,
                            errorGenerator: this.errorGenerator,
                            errorResolver: this.errorResolver,
                            serviceResolver: this.serviceResolver,
                            endpointTypeSchemasGenerator: this.endpointTypeSchemasGenerator,
                            typeSchemaGenerator: this.typeSchemaGenerator,
                            errorSchemaGenerator: this.errorSchemaGenerator,
                        });
                        endpointTypeSchemasContext.endpointTypeSchemas
                            .getGeneratedEndpointTypeSchemas(service.name, endpoint.id)
                            .writeToFile(endpointTypeSchemasContext);
                    },
                });
            }
        }
    }

    private generateServiceDeclarations() {
        const services = this.serviceResolver.getAllAugmentedServices();
        for (const service of services) {
            this.withSourceFile({
                filepath: this.serviceDeclarationReferencer.getExportedFilepath(service.name),
                run: ({ sourceFile, importsManager }) => {
                    const serviceContext = new ServiceContextImpl({
                        intermediateRepresentation: this.intermediateRepresentation,
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constantsV2,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        errorSchemaDeclarationReferencer: this.errorSchemaDeclarationReferencer,
                        endpointDeclarationReferencer: this.endpointDeclarationReferencer,
                        endpointSchemaDeclarationReferencer: this.endpointSchemaDeclarationReferencer,
                        endpointTypesGenerator: this.endpointTypesGenerator,
                        requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                        requestWrapperGenerator: this.requestWrapperGenerator,
                        typeGenerator: this.typeGenerator,
                        errorGenerator: this.errorGenerator,
                        errorResolver: this.errorResolver,
                        serviceResolver: this.serviceResolver,
                        endpointTypeSchemasGenerator: this.endpointTypeSchemasGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        errorSchemaGenerator: this.errorSchemaGenerator,
                        environmentsGenerator: this.environmentsGenerator,
                        environmentsEnumDeclarationReferencer: this.environmentsEnumDeclarationReferencer,
                        serviceDeclarationReferencer: this.serviceDeclarationReferencer,
                        serviceGenerator: this.serviceGenerator,
                    });
                    serviceContext.service.getGeneratedService(service.name).writeToFile(serviceContext);
                },
            });
        }
    }

    private generateEnvironments(): void {
        this.withSourceFile({
            filepath: this.environmentsEnumDeclarationReferencer.getExportedFilepath(),
            run: ({ sourceFile, importsManager }) => {
                const environmentsContext = new EnvironmentsContextImpl({
                    sourceFile,
                    coreUtilitiesManager: this.coreUtilitiesManager,
                    dependencyManager: this.dependencyManager,
                    fernConstants: this.intermediateRepresentation.constantsV2,
                    importsManager,
                    intermediateRepresentation: this.intermediateRepresentation,
                    environmentsGenerator: this.environmentsGenerator,
                    environmentsEnumDeclarationReferencer: this.environmentsEnumDeclarationReferencer,
                });
                environmentsContext.environments.getGeneratedEnvironments()?.writeToFile(environmentsContext);
            },
        });
    }

    private withSourceFile({
        run,
        filepath,
    }: {
        run: (args: { sourceFile: SourceFile; importsManager: ImportsManager }) => void;
        filepath: ExportedFilePath;
    }) {
        const filepathStr = convertExportedFilePathToFilePath(filepath);
        this.context.logger.debug(`Generating ${filepathStr}`);

        const sourceFile = this.rootDirectory.createSourceFile(filepathStr);
        const importsManager = new ImportsManager();

        run({ sourceFile, importsManager });

        if (sourceFile.getStatements().length === 0) {
            sourceFile.delete();
            this.context.logger.debug(`Skipping ${filepathStr} (no content)`);
        } else {
            importsManager.writeImportsToSourceFile(sourceFile);
            this.exportsManager.addExportsForFilepath(filepath);

            // this needs to be last.
            // https://github.com/dsherret/ts-morph/issues/189#issuecomment-414174283
            sourceFile.insertText(0, (writer) => {
                writer.writeLine(FILE_HEADER);
            });

            this.context.logger.debug(`Generated ${filepathStr}`);
        }
    }
}
