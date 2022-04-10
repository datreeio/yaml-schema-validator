package main

import (
	"fmt"
	"syscall/js"
)

var htmlString = `<h4>Hello, I'm an HTML snippet from Go!'</h4>`

func getHtml() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		return htmlString
	})
}

func main(){
	ch := make(chan struct{}, 0)
	fmt.Println("Hello web assembly from Go")

	js.Global().Set("getHtml", getHtml())
	<-ch
}
