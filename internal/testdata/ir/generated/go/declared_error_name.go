package ir

type DeclaredErrorName struct {
	ErrorId      ErrorId       `json:"errorId"`
	FernFilepath *FernFilepath `json:"fernFilepath"`
	Name         *Name         `json:"name"`
}
