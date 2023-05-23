package ir

type Name struct {
	OriginalName       string               `json:"originalName"`
	CamelCase          *SafeAndUnsafeString `json:"camelCase"`
	PascalCase         *SafeAndUnsafeString `json:"pascalCase"`
	SnakeCase          *SafeAndUnsafeString `json:"snakeCase"`
	ScreamingSnakeCase *SafeAndUnsafeString `json:"screamingSnakeCase"`
}
