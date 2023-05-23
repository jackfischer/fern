package ir

type SingleUnionType struct {
	Docs              *string                    `json:"docs"`
	DiscriminantValue *NameAndWireValue          `json:"discriminantValue"`
	Shape             *SingleUnionTypeProperties `json:"shape"`
}
