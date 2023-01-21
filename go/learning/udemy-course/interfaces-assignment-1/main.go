package main

import "fmt"

type shape interface {
	getArea() float64
}

type square struct {
	sideLength float64
}

type triangle struct {
	base  float64
	hight float64
}

func main() {
	s := square{
		sideLength: 4,
	}
	t := triangle{
		base:  2,
		hight: 3,
	}
	printArea(s)
	printArea(t)
}

func printArea(s shape) {
	fmt.Println(s.getArea())
}

func (s square) getArea() float64 {
	return s.sideLength * s.sideLength
}

func (t triangle) getArea() float64 {
	return t.base * t.hight * 0.5
}
