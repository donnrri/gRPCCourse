var grpc = require("grpc")
var services = require("../server/protos/dummy/dummy_grpc_pb")

function main() {
    var client = new services.DummySrrvicesClient(
        'localhost:4000',
        grpc.credentials.createInsecure()
    )
}

main()