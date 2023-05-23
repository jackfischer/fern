package ir

import (
	json "encoding/json"
	fmt "fmt"
	strconv "strconv"
)

type HttpMethod uint8

const (
	HttpMethodGet HttpMethod = iota + 1
	HttpMethodPost
	HttpMethodPut
	HttpMethodPatch
	HttpMethodDelete
)

func (x HttpMethod) String() string {
	switch x {
	default:
		return strconv.Itoa(int(x))
	case HttpMethodGet:
		return "GET"
	case HttpMethodPost:
		return "POST"
	case HttpMethodPut:
		return "PUT"
	case HttpMethodPatch:
		return "PATCH"
	case HttpMethodDelete:
		return "DELETE"
	}
}

func (x HttpMethod) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf("%q", x.String())), nil
}

func (x *HttpMethod) UnmarshalJSON(data []byte) error {
	var raw string
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}
	switch raw {
	case "GET":
		value := HttpMethodGet
		*x = value
	case "POST":
		value := HttpMethodPost
		*x = value
	case "PUT":
		value := HttpMethodPut
		*x = value
	case "PATCH":
		value := HttpMethodPatch
		*x = value
	case "DELETE":
		value := HttpMethodDelete
		*x = value
	}
	return nil
}
