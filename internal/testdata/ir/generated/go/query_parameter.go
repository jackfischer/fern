package ir

type QueryParameter struct {
	Docs          *string           `json:"docs"`
	Availability  *Availability     `json:"availability"`
	Name          *NameAndWireValue `json:"name"`
	ValueType     *TypeReference    `json:"valueType"`
	AllowMultiple bool              `json:"allowMultiple"`
}
