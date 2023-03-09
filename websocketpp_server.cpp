#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>

typedef websocketpp::server<websocketpp::config::asio> server;

int main() {
    // Create a WebSocket server endpoint
    server endpoint;

    // Set the access channels for the endpoint
    endpoint.set_access_channels(websocketpp::log::alevel::all);

    // Initialize the server endpoint
    endpoint.init_asio();

    // Register a message handler for incoming WebSocket messages
    endpoint.set_message_handler([&endpoint](websocketpp::connection_hdl hdl, server::message_ptr msg) {
        // Print the received message to the console
        std::cout << "Received message: " << msg->get_payload() << std::endl;

        // Echo the message back to the client
        endpoint.send(hdl, msg->get_payload(), msg->get_opcode());
    });

    // Listen on port 9002
    endpoint.listen(9002);

    // Start the server
    endpoint.start_accept();

    // Run the I/O service loop
    endpoint.run();

    return 0;
}
