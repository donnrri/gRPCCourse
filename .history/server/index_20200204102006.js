var grpc = require('grpc')
var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')


/*
Implement gret grpc method
*/

function greet(call, callback){

    var greeting = new greets.GreeResponse()
    greeting.SetReults( `hello ${call.request.getGreeting().getFirstname()}`)

    callback(null, greeting)
}


function main () {
    var server = new grpc.Server()
    server.addService(service.GreetServiceClient, {greet})
    server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log("Server runing on port 4000")
}

main()