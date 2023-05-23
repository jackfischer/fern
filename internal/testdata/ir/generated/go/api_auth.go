package ir

type ApiAuth struct {
	Docs        *string                `json:"docs"`
	Requirement AuthSchemesRequirement `json:"requirement"`
	Schemes     []*AuthScheme          `json:"schemes"`
}
