package internal

import (
	"github.com/rmschick/pokeapi/internal/helpers"
	"github.com/rmschick/pokeapi/internal/pokeapi/api"
)

type Configuration struct {
	PokeAPI api.Configuration     `mapstructure:"pokeAPI"`
	Logging helpers.Configuration `mapstructure:"logging"`
	Search  endpoint              `mapstructure:"search"`
}

type endpoint struct {
	Berries    []string `mapstructure:"berries"`
	Contests   []string `mapstructure:"contests"`
	Encounters []string `mapstructure:"encounters"`
	Evolution  []string `mapstructure:"evolution"`
	Games      []string `mapstructure:"games"`
	Items      []string `mapstructure:"items"`
	Locations  []string `mapstructure:"locations"`
	Machines   []string `mapstructure:"machines"`
	Moves      []string `mapstructure:"moves"`
	Pokemon    []string `mapstructure:"pokemon"`
	Resources  []string `mapstructure:"resources"`
	Utility    []string `mapstructure:"utility"`
}

// nolint: gochecknoglobals
var (
	ConfigurationDefaults = helpers.CreateDefaults("").WithChildren(
		helpers.ConfigurationDefaults,
		api.ConfigurationDefaults,
	)
)
