import { OpenAPIV3_1 } from "openapi-types";
import { FernOpenAPIExtension } from "./fernExtensions";
import { getExtension } from "./getExtension";

export interface BasicSecuritySchemeNames {
    usernameVariable?: string;
    passwordVariable?: string;
}

export function getBasicSecuritySchemeNames(
    securityScheme: OpenAPIV3_1.SecuritySchemeObject
): BasicSecuritySchemeNames {
    const usernameVariable = getExtension<string>(
        securityScheme,
        FernOpenAPIExtension.BASIC_AUTH_USERNAME_VARIABLE_NAME
    );
    const passwordVariable = getExtension<string>(
        securityScheme,
        FernOpenAPIExtension.BASIC_AUTH_PASSWORD_VARIABLE_NAME
    );

    return {
        usernameVariable,
        passwordVariable,
    };
}
