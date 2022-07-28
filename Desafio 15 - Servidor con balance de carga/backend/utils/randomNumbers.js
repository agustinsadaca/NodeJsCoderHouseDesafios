function calculateRandomNumbers(random) {
  let response = [];
  random != null ? random : random = 100000000
  for (let i = 0; i < random; i++) {
    let randomNum = Math.floor(Math.random() * 1000);
    
    
    const existRandomInArray = response.findIndex((element, index) => {
        return element.value == randomNum;
    });
    

    if (existRandomInArray == -1) {
      response.push({ cantidadRepeticiones: 0, value: randomNum });
    } else {
      response[existRandomInArray].cantidadRepeticiones += 1;
    }
  }
  console.log(response.length);
  return response;
}

process.on('message', msg => {

    const sum = calculateRandomNumbers(msg)
    process.send(sum)
})

process.send('listo')
