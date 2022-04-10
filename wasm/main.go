package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

func validate() js.Func {
	validator := New()

	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		result, err := validator.ValidateYamlSchema(args[0].String(), args[1].String())

		// put the full results in a struct
		var res struct {
			Valid bool `json:"valid"`
			Errors []string `json:"errors"`
			Err string `json:"err"`
		}
		res.Valid = result.Valid()
		res.Errors = make([]string, 0)
		errorsFound := result.Errors()
		if errorsFound != nil {
			for _, errorFound := range errorsFound{
				res.Errors = append(res.Errors, errorFound.String())
			}
		}
		if err != nil {
			res.Err = err.Error()
		}


		// convert the struct to json
		jsonResult, err := json.Marshal(res)
		if err != nil {
			// should never happen
			panic(err)
		}
		// return the json as string
		return string(jsonResult)
	})
}

func main() {
	ch := make(chan struct{}, 0)
	fmt.Println("Hello web assembly from Go")

	js.Global().Set("validate", validate())
	<-ch
}
