package ir

type ExampleHeader struct {
	WireKey string                `json:"wireKey"`
	Value   *ExampleTypeReference `json:"value"`
}
