package ir

type SingleUnionTypeProperty struct {
	Name *NameAndWireValue `json:"name"`
	Type *TypeReference    `json:"type"`
}
