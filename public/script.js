console.log('Loading wasm...');

const goWasm = new Go();

WebAssembly.instantiateStreaming(fetch('main.wasm'), goWasm.importObject).then((result) => {
  console.log('Wasm loaded!');
  goWasm.run(result.instance);
  console.log('Wasm ran!');

  document.getElementById('get-html').addEventListener('click', () => {
    document.body.innerHTML += getHtml();
  });
});
