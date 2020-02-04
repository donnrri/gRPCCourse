var grpc = require("grpc")
var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')

function main() {

    var client = new services.GreetServiceClient(
        'localhost:4000',
        grpc.credentials.createInsecure()
    )

    var request = new greets.GreetRequest()
    var greeting = new greets.Greeting()

    greeting.setFirstName("John")
    greeting.setLastName("Tobola")
    request.setGreeting(greeting)
}

main()