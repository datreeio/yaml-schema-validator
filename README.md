# yaml schema validator online

For reference, here is a list of features & changes we might want to implement in the future:  
(important features & quick wins marked in bold).

- **implement error handling for browsers that don't support WebAssembly**
- **Allow the user to choose the json schema flavor (Javascript/Golang)**
- **docs, README.md, CONTRIBUTING.md, GitHub about, GitHub repository image**
- **favicon & icons in general**
- **general web page design**
- **support ajv keywords**
- **support multiple versions of json schema (currently only latest)**
- save & share
- export as custom rule option
- better error line marker (currently only for yaml errors)
- header and additional text on the page
- improve error messages formats
- support custom keys (resourceMinimum & resourceMaximum)
- optimize the words & technical terms on the page to make it easier to understand
- support multiple configuration files in the input yaml
- support ctrl+z after applying prettier
- change or add domains to host the app on
- SEO improvements

### When developing (in dev mode)

Make sure to run `npm run build:wasm` after every change to the code in _./wasm_
