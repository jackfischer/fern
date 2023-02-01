import { Logger } from "@fern-api/logger";
import { FernGeneratorExec } from "@fern-fern/generator-exec-sdk";
import { PackageCoordinate } from "@fern-fern/generator-exec-sdk/resources";
import { NpmPackage } from "@fern-typescript/commons/src/NpmPackage";
import { PersistedTypescriptProject } from "@fern-typescript/commons/src/typescript-project/PersistedTypescriptProject";
import { GeneratorNotificationService } from "./GeneratorNotificationService";

export async function publishPackage({
    generatorNotificationService,
    logger,
    npmPackage,
    dryRun,
    typescriptProject,
}: {
    generatorNotificationService: GeneratorNotificationService;
    logger: Logger;
    npmPackage: NpmPackage;
    dryRun: boolean;
    typescriptProject: PersistedTypescriptProject;
}): Promise<void> {
    if (npmPackage.publishInfo == null) {
        throw new Error("npmPackage.publishInfo is not defined.");
    }

    const packageCoordinate = PackageCoordinate.npm({
        name: npmPackage.packageName,
        version: npmPackage.version,
    });

    await generatorNotificationService.sendUpdate(FernGeneratorExec.GeneratorUpdate.publishing(packageCoordinate));

    await typescriptProject.publish({
        logger,
        dryRun,
        publishInfo: npmPackage.publishInfo,
    });

    await generatorNotificationService.sendUpdate(FernGeneratorExec.GeneratorUpdate.published(packageCoordinate));
}
