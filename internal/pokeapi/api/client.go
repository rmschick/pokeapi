package api

import (
	"github.com/go-resty/resty/v2"
	"github.com/sirupsen/logrus"
)

type Client struct {
	configuration Configuration
	logger        *logrus.Entry
	resty         *resty.Client
}

func CreateClient(configuration Configuration, resty *resty.Client, logger *logrus.Entry) *Client {
	client := &Client{
		configuration: configuration,
		resty: resty.
			SetBaseURL(configuration.URL.String()).
			SetTimeout(configuration.Timeout).
			SetHeaders(map[string]string{
				"Accept": "application/json",
			}),
	}

	client.logger = logrus.NewEntry(logrus.StandardLogger())
	client.resty = client.resty.SetLogger(client.logger)

	return client
}
