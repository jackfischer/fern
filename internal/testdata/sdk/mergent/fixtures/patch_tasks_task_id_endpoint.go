// Generated by Fern. Do not edit.

package api

import (
	context "context"
	json "encoding/json"
	errors "errors"
	fmt "fmt"
	core "github.com/fern-api/fern-go/internal/testdata/sdk/mergent/fixtures/core"
	io "io"
	http "net/http"
)

type patchTasksTaskIdEndpoint struct {
	url        string
	httpClient core.HTTPClient
	header     http.Header
}

func newPatchTasksTaskIdEndpoint(url string, httpClient core.HTTPClient, clientOptions *core.ClientOptions) *patchTasksTaskIdEndpoint {
	return &patchTasksTaskIdEndpoint{
		url:        url,
		httpClient: httpClient,
		header:     clientOptions.ToHeader(),
	}
}

func (p *patchTasksTaskIdEndpoint) decodeError(statusCode int, body io.Reader) error {
	decoder := json.NewDecoder(body)
	switch statusCode {
	case 404:
		value := new(NotFoundError)
		if err := decoder.Decode(value); err != nil {
			return err
		}
		value.StatusCode = statusCode
		return value
	case 409:
		value := new(ConflictError)
		if err := decoder.Decode(value); err != nil {
			return err
		}
		value.StatusCode = statusCode
		return value
	case 422:
		value := new(UnprocessableEntityError)
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

func (p *patchTasksTaskIdEndpoint) Call(ctx context.Context, taskId Id, request *Task) (*Task, error) {
	endpointURL := fmt.Sprintf(p.url, taskId)
	response := new(Task)
	if err := core.DoRequest(
		ctx,
		p.httpClient,
		endpointURL,
		http.MethodPatch,
		request,
		&response,
		p.header,
		p.decodeError,
	); err != nil {
		return response, err
	}
	return response, nil
}
