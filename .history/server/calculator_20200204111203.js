var grpc = require('grpc')
var calc = require('../server/protos/calculator_pb')
var service = require('../server/protos/calculator_grpc_pb')


/*
Implement gret grpc method
*/

function sum(call, callback){

    var sumResponse = new calc.SumResponse()
    var total =  call.request.getFirstNumber() + call.request.getSecondNumber()
    sumResponse.setSumResult(total)

    callback(null, sumResponse)
}


function main () {
     var server = new grpc.Server()
     server.addService(service.CalculatorServiceService, {sum:sum})
     server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
     server.start()

     console.log("Server runing on port 4000")
}

main()