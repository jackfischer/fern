// Generated by Fern. Do not edit.

package api

import (
	context "context"
	json "encoding/json"
	errors "errors"
	fmt "fmt"
	core "github.com/fern-api/fern-go/internal/testdata/sdk/root/fixtures/core"
	io "io"
	http "net/http"
)

type getFooFooIdEndpoint struct {
	url        string
	httpClient core.HTTPClient
	header     http.Header
}

func newGetFooFooIdEndpoint(url string, httpClient core.HTTPClient, clientOptions *core.ClientOptions) *getFooFooIdEndpoint {
	return &getFooFooIdEndpoint{
		url:        url,
		httpClient: httpClient,
		header:     clientOptions.ToHeader(),
	}
}

func (g *getFooFooIdEndpoint) decodeError(statusCode int, body io.Reader) error {
	decoder := json.NewDecoder(body)
	switch statusCode {
	case 404:
		value := new(NotFoundError)
		if err := decoder.Decode(value); err != nil {
			return err
		}
		value.StatusCode = statusCode
		return value
	}
	bytes, err := io.ReadAll(body)
	if err != nil {
		return err
	}
	return errors.New(string(bytes))
}

func (g *getFooFooIdEndpoint) Call(ctx context.Context, fooId Id) (*Foo, error) {
	endpointURL := fmt.Sprintf(g.url, fooId)
	response := new(Foo)
	if err := core.DoRequest(
		ctx,
		g.httpClient,
		endpointURL,
		http.MethodGet,
		nil,
		&response,
		g.header,
		g.decodeError,
	); err != nil {
		return response, err
	}
	return response, nil
}
