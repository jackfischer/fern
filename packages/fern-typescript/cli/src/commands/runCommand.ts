import { BUILD_PROJECT_SCRIPT_NAME, writeVolumeToDisk } from "@fern-typescript/commons";
import { HelperManager } from "@fern-typescript/helper-manager";
import execa from "execa";
import { Volume } from "memfs/lib/volume";
import path from "path";
import { FernTypescriptGeneratorConfig } from "../generator/FernGeneratorConfig";
import { loadIntermediateRepresentation } from "../utils/loadIntermediateRepresentation";
import { Command } from "./Command";

export async function runCommand({
    command,
    config,
}: {
    command: Command<string>;
    config: FernTypescriptGeneratorConfig;
}): Promise<void> {
    if (config.output == null) {
        throw new Error("Output directory is not specified.");
    }
    // const {
    //     output: { path: baseOutputPath },
    // } = config;
    const outputPath = path.join("/home/fern", command.key);

    const volume = new Volume();

    const scopeWithAtSign = `@${config.organization}`;

    await command.generate({
        packageName: `${scopeWithAtSign}/${config.workspaceName}-${command.key}`,
        packageVersion: config.publish?.version,
        intermediateRepresentation: await loadIntermediateRepresentation(config.irFilepath),
        helperManager: new HelperManager(config.helpers),
        volume,
    });

    await writeVolumeToDisk(volume, outputPath);

    async function runCommandInOutputDirectory(command: string, ...args: string[]): Promise<void> {
        const commandInstance = execa(command, args, {
            cwd: outputPath,
        });
        commandInstance.stdout?.pipe(process.stdout);
        commandInstance.stderr?.pipe(process.stderr);
        await commandInstance;
    }

    async function runYarnCommandInOutputDirectory(...args: string[]): Promise<void> {
        return runCommandInOutputDirectory("yarn", ...args);
    }

    await runYarnCommandInOutputDirectory("set", "version", "berry");
    await runYarnCommandInOutputDirectory("config", "set", "enableGlobalCache", "true");
    await runYarnCommandInOutputDirectory("install");

    if (config.publish != null) {
        const { registryUrl, token } = config.publish.registries.npm;
        await runYarnCommandInOutputDirectory("config", "set", `${scopeWithAtSign}:registry`, registryUrl);
        const parsedRegistryUrl = new URL(registryUrl);
        await runYarnCommandInOutputDirectory(
            "config",
            "set",
            `//${path.join(parsedRegistryUrl.hostname, parsedRegistryUrl.pathname)}:_authToken`,
            token
        );
        await runYarnCommandInOutputDirectory("run", BUILD_PROJECT_SCRIPT_NAME);
        await runYarnCommandInOutputDirectory("publish");
    }
}
