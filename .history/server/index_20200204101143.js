var grpc = require('grpc')
var greets = require('../server/protos/greet.pb')
var service = reqyuire('../server/protos/greet_grpc_pb')

function main () {
    var server = new grpc.Server()

    server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log("Server runing on port 4000")
}

main()