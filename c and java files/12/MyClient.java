
import java.io.*;
import java.net.*;

public class MyClient {
    public static void main(String[] args) throws Exception {

        // Connect client to server on port 5000
        Socket s = new Socket("localhost", 5000);

        System.out.println("Connected to server!");

        // Read input from keyboard
        BufferedReader keyboard = new BufferedReader(
            new InputStreamReader(System.in));

        // Send messages to server
        PrintWriter out = new PrintWriter(
            s.getOutputStream(), true);

        String msg;

        // Continue sending messages until exit is entered
        while (true) {

            System.out.print("Enter message: ");
            msg = keyboard.readLine();

            // Send message to server
            out.println(msg);

            // Stop communication when exit is entered
            if (msg.equalsIgnoreCase("exit"))
                break;
        }

        // Close client socket
        s.close();
    }
}

/*
HOW TO RUN THE CLIENT:

STEP 1: Open a second VS Code terminal.

STEP 2: Compile the client if not already compiled:
        javac MyClient.java

STEP 3: Run the client:
        java MyClient

STEP 4: Enter messages and type exit to disconnect.
*/
