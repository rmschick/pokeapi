package main

import (
	"context"
	"github.com/go-resty/resty/v2"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"

	"github.com/rmschick/pokeapi/internal"
	"github.com/rmschick/pokeapi/internal/helpers"
	"github.com/rmschick/pokeapi/internal/pokeapi/api"
	"github.com/rmschick/pokeapi/internal/pokeapi/retriever"
)

func main() {
	var config internal.Configuration

	helpers.BuildConfiguration(viper.GetViper(), &config, *internal.ConfigurationDefaults)

	ctx := context.Background()
	logger := logrus.NewEntry(helpers.CreateLogger(config.Logging))

	pokeClient := api.CreateClient(config.PokeAPI, resty.New(), logger)

	r := retriever.CreateRetriever(pokeClient, config.Search.Pokemon)

	if err := r.Retrieve(ctx); err != nil {
		logger.WithError(err).Fatal("failed to retrieve pokemon information")
	}
}
