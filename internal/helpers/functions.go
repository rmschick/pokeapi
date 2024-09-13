package helpers

import (
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// TitleCase function using cases.Title
func TitleCase(s string) string {
	caser := cases.Title(language.English)

	return caser.String(s)
}
