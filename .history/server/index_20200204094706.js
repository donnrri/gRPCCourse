var grpc = require('grpc')


function main () {
    var server = new grpc.Server()

    server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
    server.start()

    console.log("Server runing on prot 4000")
}

main()