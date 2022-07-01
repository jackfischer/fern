import { runDocker } from "@fern-api/docker-utils";
import { GeneratorHelpers } from "@fern-fern/ir-model/generators";
import { writeFile } from "fs/promises";
import { DOCKER_CODEGEN_OUTPUT_DIRECTORY, DOCKER_GENERATOR_CONFIG_PATH, DOCKER_PATH_TO_IR } from "./constants";
import { getGeneratorConfig } from "./getGeneratorConfig";

export declare namespace runGenerator {
    export interface Args {
        imageName: string;
        helpers: GeneratorHelpers;
        customConfig: unknown;
        workspaceName: string;
        organization: string;

        absolutePathToIr: string;
        absolutePathToOutput: string | undefined;
        pathToWriteConfigJson: string;
    }
}

export async function runGenerator({
    imageName,
    workspaceName,
    organization,
    absolutePathToOutput,
    absolutePathToIr,
    pathToWriteConfigJson,
    helpers,
    customConfig,
}: runGenerator.Args): Promise<void> {
    const binds = [
        `${pathToWriteConfigJson}:${DOCKER_GENERATOR_CONFIG_PATH}:ro`,
        `${absolutePathToIr}:${DOCKER_PATH_TO_IR}:ro`,
    ];

    if (absolutePathToOutput != null) {
        binds.push(`${absolutePathToOutput}:${DOCKER_CODEGEN_OUTPUT_DIRECTORY}`);
    }

    const { config, binds: bindsForGenerators } = getGeneratorConfig({
        helpers,
        customConfig,
        workspaceName,
        organization,
    });
    binds.push(...bindsForGenerators);

    await writeFile(pathToWriteConfigJson, JSON.stringify(config, undefined, 4));

    await runDocker({
        imageName,
        args: [DOCKER_GENERATOR_CONFIG_PATH],
        binds,
    });
}
