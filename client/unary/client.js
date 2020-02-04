var grpc = require("grpc")
var greets = require('../../server/protos/greet_pb')
var services = require('../../server/protos/greet_grpc_pb')

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

    client.greet(request, (error, response) => {
        if(!error){
            console.log("Greeting " + response.getResult())
        }else{
            console.log(error)
        }
    })
}

main()