package api

import (
	"net/url"
	"time"
)

type Configuration struct {
	URL     url.URL       `mapstructure:"url"`
	Timeout time.Duration `mapstructure:"timeout"`
}
