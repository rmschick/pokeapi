package api

import (
	"context"
	"fmt"

	"github.com/go-resty/resty/v2"
	"github.com/pkg/errors"
)

const (
	pokemonPath = "/pokemon/"
)

func handleResponse(response *resty.Response, err error) error {
	if err != nil {
		return err
	}

	if response.IsError() {
		return fmt.Errorf("%s: %s", response.Status(), string(response.Body()))
	}

	return nil
}

func (client *Client) GetPokemonInformation(ctx context.Context, pokemonName string) (*Pokemon, error) {
	var result *Pokemon

	getPokemonPath := pokemonPath + pokemonName

	response, err := client.resty.R().
		EnableTrace().
		SetHeader("Content-Type", "application/json").
		SetContext(ctx).
		SetResult(&result).
		Get(getPokemonPath)

	if err = handleResponse(response, err); err != nil {
		return nil, errors.Wrap(err, "Failed to get pokemon information")
	}

	return result, nil
}
