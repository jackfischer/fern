package ir

type HttpRequestBodyReference struct {
	Docs            *string        `json:"docs"`
	RequestBodyType *TypeReference `json:"requestBodyType"`
}
