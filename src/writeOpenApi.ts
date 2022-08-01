import { ExitStatusUpdate, GeneratorUpdate } from "@fern-fern/generator-logging-api-client/model";
import { IntermediateRepresentation } from "@fern-fern/ir-model";
import { GeneratorConfig } from "@fern-fern/ir-model/generators";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { convertToOpenApi } from "./convertToOpenApi";
import { getCustomConfig } from "./customConfig";
import { GeneratorLoggingWrapper } from "./generatorLoggingWrapper";
import yaml from "js-yaml";

const OPENAPI_JSON_FILENAME = "openapi.json";
const OPENAPI_YML_FILENAME = "openapi.yml";

export async function writeOpenApi(pathToConfig: string): Promise<void> {
    const configStr = await readFile(pathToConfig);
    const config = JSON.parse(configStr.toString()) as GeneratorConfig;
    const customConfig = getCustomConfig(config);

    if (config.output == null) {
        throw new Error("Output directory is not specified.");
    }

    const generatorLoggingClient = new GeneratorLoggingWrapper(config);

    try {
        await generatorLoggingClient.sendUpdate(
            GeneratorUpdate.init({
                packagesToPublish: [],
            })
        );

        const ir = await loadIntermediateRepresentation(config.irFilepath);
        const openApiDefinition = convertToOpenApi(config.workspaceName, config.publish?.version ?? "", ir);
        if (customConfig.format === "json") {
            await writeFile(
                path.join(config.output.path, OPENAPI_JSON_FILENAME),
                JSON.stringify(openApiDefinition, undefined, 2)
            );
        } else {
            await writeFile(path.join(config.output.path, OPENAPI_YML_FILENAME), yaml.dump(openApiDefinition));
        }
        await generatorLoggingClient.sendUpdate(GeneratorUpdate.exitStatusUpdate(ExitStatusUpdate.successful()));
    } catch (e) {
        await generatorLoggingClient.sendUpdate(
            GeneratorUpdate.exitStatusUpdate(
                ExitStatusUpdate.error({
                    message: e instanceof Error ? e.message : "Encountered error",
                })
            )
        );
    }
}

async function loadIntermediateRepresentation(pathToFile: string): Promise<IntermediateRepresentation> {
    return JSON.parse((await readFile(pathToFile)).toString());
}
