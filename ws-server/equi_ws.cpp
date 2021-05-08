#include "client_ws.hpp"
#include "server_ws.hpp"
#include <future>

using namespace std;

using WsServer = SimpleWeb::SocketServer<SimpleWeb::WS>;

int main() {
    WsServer server;
    server.config.port = 8080;

    auto &echo_all = server.endpoint["^/echo_all/?$"];
    echo_all.on_message = [&server](shared_ptr<WsServer::Connection> /*connection*/,
                                    shared_ptr<WsServer::InMessage> in_message) {
        auto out_message = in_message->string();

        for(auto &a_connection : server.get_connections())
          a_connection->send(out_message);
    };

    echo_all.on_open = [](shared_ptr<WsServer::Connection> connection) {
        cout << "Server: Opened connection " << connection.get() << endl;
    };

    echo_all.on_close = [](shared_ptr<WsServer::Connection> connection, int status, const string & /*reason*/) {
        cout << "Server: Closed connection " << connection.get() << " with status code " << status << endl;
    };

    echo_all.on_handshake = [](shared_ptr<WsServer::Connection> /*connection*/,
                               SimpleWeb::CaseInsensitiveMultimap & /*response_header*/) {
        return SimpleWeb::StatusCode::information_switching_protocols;
    };

    echo_all.on_error = [](shared_ptr<WsServer::Connection> connection, const SimpleWeb::error_code &ec) {
        cout << "Server: Error in connection " << connection.get() << ". "
             << "Error: " << ec << ", error message: " << ec.message() << endl;
    };

    promise<unsigned short> server_port;
    thread server_thread([&server, &server_port]() {
        server.start([&server_port](unsigned short port) {
          server_port.set_value(port);
        });
    });
    cout << "Server listening on port " << server_port.get_future().get() << endl << endl;

    server_thread.join();
}
