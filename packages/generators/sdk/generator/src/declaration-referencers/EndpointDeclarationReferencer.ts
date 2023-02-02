import { DeclaredServiceName, HttpEndpoint } from "@fern-fern/ir-model/http";
import { ExportedFilePath, Reference } from "@fern-typescript/commons";
import { AbstractSdkClientClassDeclarationReferencer } from "./AbstractSdkClientClassDeclarationReferencer";
import { DeclarationReferencer } from "./DeclarationReferencer";

export declare namespace EndpointDeclarationReferencer {
    export interface Name {
        service: DeclaredServiceName;
        endpoint: HttpEndpoint;
    }
}
export class EndpointDeclarationReferencer extends AbstractSdkClientClassDeclarationReferencer<EndpointDeclarationReferencer.Name> {
    public getExportedFilepath(name: EndpointDeclarationReferencer.Name): ExportedFilePath {
        return {
            directories: this.getExportedDirectory(name.service),
            file: {
                nameOnDisk: this.getFilename(name),
                exportDeclaration: {
                    namespaceExport: this.getNamespaceExport(name),
                },
            },
        };
    }

    public getFilename(name: EndpointDeclarationReferencer.Name): string {
        return `${this.getNamespaceExport(name)}.ts`;
    }

    private getNamespaceExport({ endpoint }: EndpointDeclarationReferencer.Name): string {
        return endpoint.name.camelCase.unsafeName;
    }

    public getReferenceToEndpointExport(
        args: DeclarationReferencer.getReferenceTo.Options<EndpointDeclarationReferencer.Name>
    ): Reference {
        return this.getReferenceTo(this.getNamespaceExport(args.name), args);
    }

    protected override getExportedFilepathForReference(name: EndpointDeclarationReferencer.Name): ExportedFilePath {
        return {
            directories: this.getExportedDirectory(name.service),
            file: undefined,
        };
    }
}
