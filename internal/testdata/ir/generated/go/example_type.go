package ir

type ExampleType struct {
	JsonExample any               `json:"jsonExample"`
	Docs        *string           `json:"docs"`
	Name        *Name             `json:"name"`
	Shape       *ExampleTypeShape `json:"shape"`
}
