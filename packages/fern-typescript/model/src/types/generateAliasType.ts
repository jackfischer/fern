import { AliasTypeDefinition, PrimitiveType, TypeDefinition, TypeReference } from "@fernapi/ir-generation";
import { Directory, SourceFile, ts, VariableDeclarationKind, Writers } from "ts-morph";
import { addBrandedTypeAlias } from "../utils/addBrandedTypeAlias";
import { generateTypeReference } from "../utils/generateTypeReference";
import { getTextOfTsNode } from "../utils/getTextOfTsNode";
import { maybeAddDocs } from "../utils/maybeAddDocs";

export function generateAliasType({
    file,
    typeDefinition,
    shape,
    modelDirectory,
}: {
    file: SourceFile;
    typeDefinition: TypeDefinition;
    shape: AliasTypeDefinition;
    modelDirectory: Directory;
}): void {
    if (TypeReference.isPrimitive(shape.aliasOf) && shape.aliasOf.primitive === PrimitiveType.String) {
        generateStringAlias(file, typeDefinition);
    } else {
        const typeAlias = file.addTypeAlias({
            name: typeDefinition.name.name,
            type: getTextOfTsNode(
                generateTypeReference({
                    reference: shape.aliasOf,
                    from: file,
                    modelDirectory,
                })
            ),
            isExported: true,
        });
        maybeAddDocs(typeAlias, typeDefinition.docs);
    }
}

function generateStringAlias(file: SourceFile, typeDefinition: TypeDefinition) {
    addBrandedTypeAlias({ node: file, typeName: typeDefinition.name, docs: typeDefinition.docs });

    file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
            {
                name: typeDefinition.name.name,
                initializer: Writers.object({
                    of: getTextOfTsNode(getOf(typeDefinition.name.name)),
                }),
            },
        ],
        isExported: true,
    });
}

function getOf(idTypeName: string): ts.ArrowFunction {
    const VALUE_PARAMETER_NAME = "value";

    return ts.factory.createArrowFunction(
        undefined,
        undefined,
        [
            ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                undefined,
                VALUE_PARAMETER_NAME,
                undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword)
            ),
        ],
        ts.factory.createTypeReferenceNode(idTypeName),
        undefined,
        ts.factory.createAsExpression(
            ts.factory.createIdentifier(VALUE_PARAMETER_NAME),
            ts.factory.createTypeReferenceNode(idTypeName)
        )
    );
}
