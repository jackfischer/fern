package ir

import (
	json "encoding/json"
	fmt "fmt"
)

type Environments struct {
	Type             string
	SingleBaseUrl    *SingleBaseUrlEnvironments
	MultipleBaseUrls *MultipleBaseUrlsEnvironments
}

func (x *Environments) UnmarshalJSON(data []byte) error {
	var unmarshaler struct {
		Type string `json:"type"`
	}
	if err := json.Unmarshal(data, &unmarshaler); err != nil {
		return err
	}
	x.Type = unmarshaler.Type
	switch unmarshaler.Type {
	case "singleBaseUrl":
		value := new(SingleBaseUrlEnvironments)
		if err := json.Unmarshal(data, &unmarshaler); err != nil {
			return err
		}
		x.SingleBaseUrl = value
	case "multipleBaseUrls":
		value := new(MultipleBaseUrlsEnvironments)
		if err := json.Unmarshal(data, &unmarshaler); err != nil {
			return err
		}
		x.MultipleBaseUrls = value
	}
	return nil
}

type EnvironmentsVisitor interface {
	VisitSingleBaseUrl(*SingleBaseUrlEnvironments) error
	VisitMultipleBaseUrls(*MultipleBaseUrlsEnvironments) error
}

func (x *Environments) Accept(v EnvironmentsVisitor) error {
	switch x.Type {
	default:
		return fmt.Errorf("invalid type %s in %T", x.Type, x)
	case "singleBaseUrl":
		return v.VisitSingleBaseUrl(x.SingleBaseUrl)
	case "multipleBaseUrls":
		return v.VisitMultipleBaseUrls(x.MultipleBaseUrls)
	}
}
