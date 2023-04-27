import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/fs-utils";
import { CONSOLE_LOGGER } from "@fern-api/logger";
import { createMockTaskContext } from "@fern-api/task-context";
import { loadWorkspace } from "@fern-api/workspace-loader";
import { parse } from "../parse";

const FIXTURES_PATH = join(AbsoluteFilePath.of(__dirname), RelativeFilePath.of("fixtures"));

describe("open api parser", () => {
    testFixture("vellum");
    testFixture("apiture");
});

function testFixture(fixtureName: string) {
    // eslint-disable-next-line jest/valid-title
    describe(fixtureName, () => {
        it("simple", async () => {
            const workspace = await loadWorkspace({
                absolutePathToWorkspace: join(FIXTURES_PATH, RelativeFilePath.of(fixtureName)),
                context: createMockTaskContext(),
                cliVersion: "0.0.0",
            });
            if (!workspace.didSucceed) {
                throw new Error("Failed to load workspace: " + JSON.stringify(workspace.failures, undefined, 4));
            }
            if (workspace.workspace.type === "fern") {
                throw new Error("Expected OpenAPI workspace");
            }

            const openApiIr = await parse({
                root: workspace.workspace.definition,
                taskContext: createMockTaskContext({ logger: CONSOLE_LOGGER }),
            });
            expect(openApiIr).toMatchSnapshot();
        });
    });
}
