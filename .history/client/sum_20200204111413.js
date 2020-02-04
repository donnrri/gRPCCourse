var grpc = require("grpc")
var sum = require('../server/protos/calculator_pb')
var services = require('../server/protos/calculator_grpc_pb')

function main() {

    var client = new services.CalculatorService(
        'localhost:4000',
        grpc.credentials.createInsecure()
    )

    var request = new sum.GreetRequest()
    var calc = new sum.Greeting()

    calc.setFirstName(2)
    calc.setLastName(10)
    request.setGreeting(greeting)

    client.greet(request, (error, response) => {
        if(!error){
            console.log("Greeting " + response.getResult())
        }else{
            console.log(error)
        }
    })
}

main()