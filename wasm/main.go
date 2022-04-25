package main

import (
	"encoding/json"
	"syscall/js"
)

type myResult struct {
	Context     string `json:"context"`
	Description string `json:"description"`
}

func validate() js.Func {
	validator := New()
	return js.FuncOf(func(this js.Value, args []js.Value) (returnValue interface{}) {
		defer func() {
			if r := recover(); r != nil {
				returnValue = "{ \"err\": \"Unexpected error: " + ParseErrorToString(r) + ". This type of error should never happen! Please report the bug by visiting https://github.com/datreeio/yaml-schema-validator/issues/new/choose" + "\" }"
			}
		}()

		result, err := validator.ValidateYamlSchema(args[0].String(), args[1].String())

		// put the full results in a struct
		var res struct {
			Valid  bool       `json:"valid"`
			Errors []myResult `json:"errors"`
			Err    string     `json:"err"`
		}
		if result != nil {
			res.Errors = make([]myResult, 0)
			res.Valid = result.Valid()
			errorsFound := result.Errors()
			if errorsFound != nil {
				for _, errorFound := range errorsFound {
					res.Errors = append(res.Errors, myResult{
						Context:     errorFound.Context().String(),
						Description: errorFound.Description(),
					})
				}
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
		returnValue = string(jsonResult)
		return
	})
}

func main() {
	ch := make(chan struct{}, 0)
	js.Global().Set("validate", validate())
	<-ch
}
