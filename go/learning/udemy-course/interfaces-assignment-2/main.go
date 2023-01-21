package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	fileName := os.Args[1]
	fmt.Println(fileName)
	f, err := os.Open(fileName)
	if err != nil {
		fmt.Println("Error:", err)
	}
	io.Copy(os.Stdout, f)
}
