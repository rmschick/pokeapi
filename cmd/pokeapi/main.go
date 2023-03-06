package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"

	"github.com/rmschick/pokeapi/internal"
	"github.com/rmschick/pokeapi/internal/helpers"
	"github.com/rmschick/pokeapi/internal/pokeapi/api"
)

func main() {
	var config internal.Configuration

	helpers.BuildConfiguration(viper.GetViper(), &config, *internal.ConfigurationDefaults)

	ctx := context.Background()
	logger := logrus.NewEntry(helpers.CreateLogger(config.Logging))

	pokeClient := api.CreateClient(config.PokeAPI, resty.New(), logger)

	response, err := pokeClient.GetPokemonInformation(ctx, config.Pokemon)
	if err != nil {
		logger.WithError(err).Fatal("failed client request")
	}

	s, err := json.MarshalIndent(response, "", "\t")
	if err != nil {
		logger.WithError(err).Fatal("failed to marshal response")
	}

	fmt.Printf("%s", string(s))
}
