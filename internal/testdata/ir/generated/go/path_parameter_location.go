package ir

import (
	json "encoding/json"
	fmt "fmt"
	strconv "strconv"
)

type PathParameterLocation uint8

const (
	PathParameterLocationRoot PathParameterLocation = iota + 1
	PathParameterLocationService
	PathParameterLocationEndpoint
)

func (x PathParameterLocation) String() string {
	switch x {
	default:
		return strconv.Itoa(int(x))
	case PathParameterLocationRoot:
		return "ROOT"
	case PathParameterLocationService:
		return "SERVICE"
	case PathParameterLocationEndpoint:
		return "ENDPOINT"
	}
}

func (x PathParameterLocation) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf("%q", x.String())), nil
}

func (x *PathParameterLocation) UnmarshalJSON(data []byte) error {
	var raw string
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}
	switch raw {
	case "ROOT":
		value := PathParameterLocationRoot
		*x = value
	case "SERVICE":
		value := PathParameterLocationService
		*x = value
	case "ENDPOINT":
		value := PathParameterLocationEndpoint
		*x = value
	}
	return nil
}
