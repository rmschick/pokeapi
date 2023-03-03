package api

// nolint: revive, stylecheck, tagliatelle
type pokemon struct {
	Name                     string `json:"name"`
	Is_default               bool   `json:"is_default"`
	Location_area_encounters string `json:"location_area_encounters"`
	Order                    int    `json:"order"`
	Species                  any    `json:"species"`
	Weight                   int    `json:"weight"`
	Abilities                any    `json:"abilities"`
	Forms                    any    `json:"forms"`
	Game_indices             any    `json:"game_indices"`
	Moves                    any    `json:"moves"`
	Sprites                  any    `json:"sprites"`
	Height                   int    `json:"height"`
	Held_items               any    `json:"held_items"`
	Id                       int    `json:"id"`
	Past_types               any    `json:"past_types"`
	Stats                    any    `json:"stats"`
	Base_experience          int    `json:"base_experience"`
	Types                    any    `json:"types"`
}
