package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

type leaguesResponse struct {
	Status bool
	Data   []leagueResponseItem
}

type leagueResponseItem struct {
	Id    string
	Name  string
	Slug  string
	Abbr  string
	Logos struct {
		Light string
		Dark  string
	}
}

func main() {
	resp, err := http.Get("https://api-football-standings.azharimm.dev/leagues")

	if err != nil {
		fmt.Println("Error:", err)
	}

	defer resp.Body.Close()

	var ls leaguesResponse
	json.NewDecoder(resp.Body).Decode(&ls)

	var leagues []string
	for _, obj := range ls.Data {
		leagues = append(leagues, obj.Name)
	}

	fmt.Println(strings.Join(leagues, ","))
}
