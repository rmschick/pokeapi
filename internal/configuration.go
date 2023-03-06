package internal

import (
	"github.com/rmschick/pokeapi/internal/helpers"
	"github.com/rmschick/pokeapi/internal/pokeapi/api"
)

type Configuration struct {
	PokeAPI api.Configuration     `mapstructure:"pokeAPI"`
	Logging helpers.Configuration `mapstructure:"logging"`
	Pokemon string                `mapstructure:"pokemon"`
}

// nolint: gochecknoglobals
var (
	ConfigurationDefaults = helpers.CreateDefaults("").WithChildren(
		helpers.ConfigurationDefaults,
		api.ConfigurationDefaults,
	)
)
