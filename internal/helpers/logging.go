package helpers

import (
	"os"
	"strings"

	"github.com/sirupsen/logrus"
)

const (
	JSONFormat       = "json"
	TextFormat       = "text"
	PrettyJSONFormat = "prettyjson"
)

type Configuration struct {
	Format       string `mapstructure:"format"`
	Prefix       string `mapstructure:"prefix"`
	Verbose      bool   `mapstructure:"verbose"`
	OmitMetadata bool   `mapstructure:"omitMetadata"`
}

// nolint: gochecknoglobals
var (
	// ConfigurationDefaults defaults for configuration with the prefix of 'logging'.
	ConfigurationDefaults = CreateDefaults("logging").WithFields(map[string]any{
		"format":       JSONFormat,
		"verbose":      false,
		"omitMetadata": false,
		"prefix":       "pokeapi",
	})
)

// CreateLogger configures the logging environment and creates a "base" logger to leverage.
func CreateLogger(configuration Configuration) *logrus.Logger {
	logger := logrus.StandardLogger()
	logger.SetOutput(os.Stdout)
	logger.SetReportCaller(true)

	switch configuration.Verbose {
	case true:
		logger.SetLevel(logrus.DebugLevel)
	default:
		logger.SetLevel(logrus.InfoLevel)
	}

	switch strings.ToLower(configuration.Format) {
	case TextFormat:
		logger.SetFormatter(&logrus.TextFormatter{
			DisableLevelTruncation: true,
			QuoteEmptyFields:       true,
		})
	case PrettyJSONFormat:
		formatter := jsonFormatter(configuration)
		formatter.PrettyPrint = true

		logger.SetFormatter(formatter)
	default:
		logger.SetFormatter(jsonFormatter(configuration))
	}

	return logger
}

func jsonFormatter(configuration Configuration) *logrus.JSONFormatter {
	jsonFormatter := &logrus.JSONFormatter{}

	if configuration.Prefix != "" {
		jsonFormatter.DataKey = configuration.Prefix
	}

	return jsonFormatter
}
