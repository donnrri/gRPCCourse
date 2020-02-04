var grpc = require('grpc')


function main () {
    var server = new grpc.Server()

    server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
}

main()