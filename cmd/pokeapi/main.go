package main

import (
	"context"
	"html/template"
	"net/http"

	"github.com/gin-gonic/gin"
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

	router := gin.Default()

	router.SetFuncMap(template.FuncMap{
		"toUpper": helpers.TitleCase,
	})
	router.LoadHTMLGlob("templates/*")

	router.GET("/pokemon/:name", func(c *gin.Context) {
		pokemonName := c.Param("name")
		pokemonInfo, err := pokeClient.GetPokemonInformation(ctx, pokemonName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve pokemon information"})

			return
		}

		// Serve the Pokémon info to the HTML template
		c.HTML(http.StatusOK, "pokemon.html", pokemonInfo)
	})

	err := router.Run(":8080")
	if err != nil {
		panic(err)
	}
}
