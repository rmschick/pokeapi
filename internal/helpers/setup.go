package helpers

import (
	"strings"

	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

const (
	separator = "."
)

type Defaults struct {
	prefix   string
	fields   map[string]any
	children []*Defaults
}

func initialSetup(viperRef *viper.Viper) {
	viperRef.SetConfigName("configuration")
	viperRef.SetConfigType("yaml")
	viperRef.AddConfigPath(".")

	viperRef.AutomaticEnv()
}

func CreateDefaults(prefix string) *Defaults {
	return &Defaults{
		prefix:   prefix,
		fields:   make(map[string]any),
		children: make([]*Defaults, 0),
	}
}

func (config *Defaults) WithChildren(children ...*Defaults) *Defaults {
	newCtx := config.Copy()

	newCtx.children = append(newCtx.children, children...)

	return newCtx
}

func (config *Defaults) Copy() *Defaults {
	newCtx := &Defaults{
		prefix:   config.prefix,
		fields:   make(map[string]any),
		children: make([]*Defaults, len(config.children)),
	}

	for k, v := range config.fields {
		newCtx.fields[k] = v
	}

	for i, child := range config.children {
		newCtx.children[i] = child.Copy()
	}

	return newCtx
}

// BuildConfiguration builds a Viper config with defaults and env vars.
func BuildConfiguration(viperRef *viper.Viper, config any, defaults Defaults, envVars ...string) {
	for _, envVar := range envVars {
		_ = viperRef.BindEnv(envVar)
	}

	err := GetConfigWithDefaults(viperRef, config, defaults)
	if err != nil {
		panic(err)
	}
}

// GetConfigWithDefaults leverages the viper library to attempt loading in a configuration file while setting defaults.
func GetConfigWithDefaults(viperRef *viper.Viper, configuration any, defaults Defaults) error {
	initialSetup(viperRef)

	for key, value := range defaults.GetFields() {
		viperRef.SetDefault(key, value)
	}

	return loadConfig(viperRef, configuration)
}

func (config *Defaults) GetFields() map[string]any {
	return config.getFlattenedFields([]string{})
}

func (config *Defaults) getFlattenedFields(paths []string) map[string]any {
	fields := make(map[string]any)

	if config.prefix != "" {
		paths = append(paths, config.prefix)
	}

	for k, v := range config.fields {
		fields[strings.Join(append(paths, k), separator)] = v
	}

	return config.gatherChildFields(paths, fields)
}

func (config *Defaults) gatherChildFields(paths []string, fields map[string]any) map[string]any {
	for _, child := range config.children {
		results := child.getFlattenedFields(paths)

		for k, v := range results {
			fields[k] = v
		}
	}

	return fields
}

func (config *Defaults) WithFields(fields map[string]any) *Defaults {
	newCtx := config.Copy()

	for k, v := range fields {
		newCtx.fields[k] = v
	}

	return newCtx
}

func loadConfig(viperRef *viper.Viper, configuration any) error {
	err := viperRef.ReadInConfig()
	if err != nil {
		return errors.Wrap(err, "failed to read in configuration")
	}

	err = viperRef.Unmarshal(&configuration)
	if err != nil {
		return errors.Wrap(err, "failed to unmarshal configuration into expected structure")
	}

	return nil
}
