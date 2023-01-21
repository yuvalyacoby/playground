package main

func main() {
	s := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	for _, num := range s {
		if num%2 == 0 {
			println(num, "is even")
			continue
		}
		println(num, "is odd")
	}
}
