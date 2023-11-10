package retriever

import (
	"context"
	"github.com/pkg/errors"

	"github.com/rmschick/pokeapi/internal/pokeapi/api"
)

type Retriever struct {
	client   *api.Client
	retrieve []string
}

// CreateRetriever creates a new Retriever
func CreateRetriever(client *api.Client, retrieve []string) *Retriever {
	return &Retriever{
		client:   client,
		retrieve: retrieve,
	}
}

// Retrieve retrieves all information for the given resources from PokeAPI
func (r *Retriever) Retrieve(ctx context.Context) error {
	allInformation := make(map[string]interface{})

	for _, resource := range r.retrieve {
		information, err := r.client.GetPokemonInformation(ctx, resource)
		if err != nil {
			return errors.Wrap(err, "Failed to get pokemon information")
		}

		allInformation[resource] = information
	}

	return nil
}
