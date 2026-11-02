
#include <stdio.h>

int main() {
    int n, i, sum = 0, data[20], checksum;

    // Accept number of data words
    printf("Enter number of data words: ");
    scanf("%d", &n);

    // Accept 8-bit data words
    printf("Enter 8-bit data words (decimal values 0-255):\n");

    // Calculate sum of all data words
    for (i = 0; i < n; i++) {
        scanf("%d", &data[i]);
        sum += data[i];
    }

    // Add carry back to the 8-bit sum
    while (sum > 255)
        sum = (sum & 255) + (sum >> 8);

    // Calculate 1's complement checksum
    checksum = (~sum) & 255;

    printf("Checksum: %d\n", checksum);

    // Add checksum to the original sum
    sum += checksum;

    // Perform carry wrapping
    while (sum > 255)
        sum = (sum & 255) + (sum >> 8);

    // Accept checksum received from receiver
    printf("Enter received checksum: ");
    scanf("%d", &checksum);

    // Recalculate sum for verification
    sum = 0;

    // Add all original data words
    for (i = 0; i < n; i++)
        sum += data[i];

    // Add received checksum
    sum += checksum;

    // Add carry back to the sum
    while (sum > 255)
        sum = (sum & 255) + (sum >> 8);

    // Check whether checksum verification is successful
    if (sum == 255)
        printf("No error detected.\n");
    else
        printf("Error detected.\n");

    return 0;
}

/*
HOW TO RUN IN VS CODE:

STEP 1: Open VS Code terminal using Ctrl + ~.

STEP 2: Navigate to the program folder:
        cd "C:\Users\Ritika\Downloads\CN\c and java files"

STEP 3: Compile the program:
        gcc 8.c -o 8.exe

STEP 4: Execute the program:
        .\8.exe


Enter number of data words: 2
Enter 8-bit data words (decimal values 0-255):
100
150
Checksum: 5
Enter received checksum: 5
No error detected.

Enter number of data words: 2
Enter 8-bit data words (decimal values 0-255):
100
150
Checksum: 5
Enter received checksum: 10
Error detected.
*/
