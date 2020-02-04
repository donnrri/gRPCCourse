var grpc = require("grpc")
var calc = require('../../server/protos/calculator_pb')
var calcService = require('../../server/protos/calculator_grpc_pb')

function main() {
    var client = new calcService.CalculatorServiceClient(
        'localhost:4000',
        grpc.credentials.createInsecure()
    )

    var request = new calc.SumRequest()

    request.setFirstNumber(2)
    request.setSecondNmber(10)
   

    client.sum(request, (error, response) => {
        if(!error){
            console.log("Calculated " + response.getSum())
        }else{
            console.log(error)
        }
    })
}

main()