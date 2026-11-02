
import java.io.*;
import java.net.*;

public class MyServer {
    public static void main(String[] args) throws Exception {

        // Create server socket on port 5000
        ServerSocket ss = new ServerSocket(5000);

        System.out.println("Server waiting for client...");

        // Wait for client connection
        Socket s = ss.accept();

        System.out.println("Client connected!");

        // Receive messages from client
        BufferedReader in = new BufferedReader(
            new InputStreamReader(s.getInputStream()));

        String msg;

        // Read messages until client sends exit
        while ((msg = in.readLine()) != null) {

            // Check whether client wants to disconnect
            if (msg.equalsIgnoreCase("exit")) {
                System.out.println("Client disconnected.");
                break;
            }

            // Display message received from client
            System.out.println("Client: " + msg);
        }

        // Close server and client socket
        s.close();
        ss.close();
    }
}

/*
HOW TO RUN THE SERVER:

STEP 1: Open VS Code terminal (Ctrl + ~).

STEP 2: Compile both Java files:
        javac MyServer.java MyClient.java

STEP 3: Start the server:
        java MyServer

STEP 4: Keep this terminal running.
        Open another terminal to run the client.
*/
