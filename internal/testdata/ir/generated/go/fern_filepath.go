package ir

type FernFilepath struct {
	AllParts    []*Name `json:"allParts"`
	PackagePath []*Name `json:"packagePath"`
	File        *Name   `json:"file"`
}
