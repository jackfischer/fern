package ir

type HeaderAuthScheme struct {
	Docs      *string           `json:"docs"`
	Name      *NameAndWireValue `json:"name"`
	ValueType *TypeReference    `json:"valueType"`
	Prefix    *string           `json:"prefix"`
}
