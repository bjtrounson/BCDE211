onmessage = function (event) {
    let start = new Date()

    for (let i =0; i < 10000000000; i++) {

    }

    let stop = new Date()
    
    console.log(stop-start)
    postMessage(stop-start)
}