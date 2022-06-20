import { HttpService, WebSocketChannel } from "@fern-api/api";
import { GeneratedHttpEndpointTypes } from "./http/types";
import { GeneratedWebSocketOperationTypes } from "./websocket/types";

export interface ServicesWithGeneratedTypes {
    http: HttpServiceWithGeneratedTypes[];
    websocket: WebSocketChannelWithGeneratedTypes[];
}

export interface HttpServiceWithGeneratedTypes extends Omit<HttpService, "endpoints"> {
    endpoints: HttpEndpointWithGeneratedTypes[];
}

export interface HttpEndpointWithGeneratedTypes {
    generatedTypes: GeneratedHttpEndpointTypes;
}

export interface WebSocketChannelWithGeneratedTypes extends Omit<WebSocketChannel, "client" | "server"> {
    client: WebSocketMessengerWithGeneratedTypes;
    server: WebSocketMessengerWithGeneratedTypes;
}

export interface WebSocketMessengerWithGeneratedTypes {
    operations: WebSocketOperationWithGeneratedTypes[];
}

export interface WebSocketOperationWithGeneratedTypes {
    generatedTypes: GeneratedWebSocketOperationTypes;
}
