package ir

type Subpackage struct {
	Docs               *string        `json:"docs"`
	FernFilepath       *FernFilepath  `json:"fernFilepath"`
	Service            *ServiceId     `json:"service"`
	Types              []TypeId       `json:"types"`
	Errors             []ErrorId      `json:"errors"`
	Subpackages        []SubpackageId `json:"subpackages"`
	HasEndpointsInTree bool           `json:"hasEndpointsInTree"`
	Name               *Name          `json:"name"`
}
