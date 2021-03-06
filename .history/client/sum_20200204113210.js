var grpc = require("grpc")
var calc = require('../server/protos/calculator_pb')
var calcService = require('../server/protos/calculator_grpc_pb')

function main() {
console.log(calcServices)
    var client = new calcService.CalculatorServiceClient(
        'localhost:4000',
        grpc.credentials.createInsecure()
    )

    var request = new calc.SumRequest()

    calc.setFirstNumber(2)
    calc.setLastNumber(10)
   

    client.sum(request, (error, response) => {
        if(!error){
            console.log("Calculated " + response.getSumResult())
        }else{
            console.log(error)
        }
    })
}

main()