package ir

type ObjectProperty struct {
	Docs         *string           `json:"docs"`
	Availability *Availability     `json:"availability"`
	Name         *NameAndWireValue `json:"name"`
	ValueType    *TypeReference    `json:"valueType"`
}
