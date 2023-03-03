package api

import (
	"net/url"
	"time"

	"github.com/rmschick/pokeapi/internal/helpers"
)

type Configuration struct {
	URL        url.URL       `mapstructure:"url"`
	RetryCount int           `mapstructure:"retryCount"`
	Timeout    time.Duration `mapstructure:"timeout"`
}

// nolint: gomnd, gochecknoglobals
var (
	ConfigurationDefaults = helpers.CreateDefaults("pokeAPI").WithFields(map[string]interface{}{
		"retryCount": 2,
		"timeout":    10 * time.Second,
		"URL": url.URL{
			Scheme: "https",
			Host:   "pokeapi.co",
			Path:   "api/v2",
		},
	})
)
