
#include <stdio.h>
#include <string.h>

int main() {
    int data[20], h[30], n, r = 0;
    int i, j, k, pos, error = 0;

    printf("Enter number of data bits: ");
    scanf("%d", &n);

    printf("Enter data bits one by one (MSB first): ");
    for (i = 0; i < n; i++)
        scanf("%1d", &data[i]);  // Read data bits one by one

    // Calculate number of parity bits required
    while ((1 << r) < n + r + 1)
        r++;

    int total = n + r;  // Total bits = data bits + parity bits

    // Insert data bits and reserve parity bit positions
    for (i = 1, j = 0; i <= total; i++) {
        if ((i & (i - 1)) == 0)  // Positions 1, 2, 4, 8... are parity bits
            h[i] = 0;
        else
            h[i] = data[j++];   // Place data bits in remaining positions
    }

    // Calculate even parity bits
    for (i = 1; i <= total; i *= 2) {
        int parity = 0;

        for (j = 1; j <= total; j++) {
            if (j & i)
                parity ^= h[j];  // XOR bits covered by this parity bit
        }

        h[i] = parity;  // Store calculated parity bit
    }

    // Display generated Hamming code (MSB first)
    printf("Generated Hamming code: ");
    for (i = total; i >= 1; i--)
        printf("%d", h[i]);

    printf("\n");

    // Read received Hamming code
    printf("Enter received code (%d bits, MSB first): ", total);
    for (i = total; i >= 1; i--)
        scanf("%1d", &h[i]);

    // Calculate syndrome to detect error position
    pos = 0;

    for (i = 1; i <= total; i *= 2) {
        int parity = 0;

        for (j = 1; j <= total; j++) {
            if (j & i)
                parity ^= h[j];  // Check parity of selected positions
        }

        if (parity)
            pos += i;  // Add parity position if parity check fails
    }

    // Check and correct error using syndrome
    if (pos == 0) {
        printf("No error detected.\n");
    }
    else if (pos <= total) {
        printf("Error detected at bit position %d (from right).\n", pos);

        h[pos] ^= 1;  // Flip the incorrect bit

        printf("Corrected Hamming code: ");
        for (i = total; i >= 1; i--)
            printf("%d", h[i]);

        printf("\n");
    }
    else {
        printf("Invalid syndrome; error cannot be corrected.\n");
        error = 1;
    }

    return error;
}

/*
HOW TO RUN IN VS CODE:

STEP 1: Open VS Code terminal (Ctrl + ~).

STEP 2: Navigate to the folder:
        cd "C:\Users\Ritika\Downloads\CN\c and java files" or just write cd and then the c drive link from the swearch bar 

STEP 3: Compile the program:
        gcc 7.c -o 7.exe

STEP 4: Run the program:
        .\7.exe


Enter number of data bits: 4
Enter data bits one by one (MSB first): 1 0 1 1
Generated Hamming code: 1010101
Enter received code (7 bits, MSB first): 1010101
No error detected.
*/
