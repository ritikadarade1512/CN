
#include <stdio.h>      // Header file for printf() and scanf()
#include <string.h>     // Header file for strlen() and strcpy()

int main()
{
    // Variable declaration
    char data[100], gen[20], code[120], temp[120];
    int n, m, i, j, error = 0;

    printf("Enter data bits: ");
    scanf("%s", data);              // Accept original binary data

    printf("Enter generator bits: ");
    scanf("%s", gen);               // Accept generator polynomial in binary

    n = strlen(data);               // Calculate length of data bits
    m = strlen(gen);                // Calculate length of generator bits

    strcpy(code, data);             // Copy original data into code

    // Append (m-1) zeros to the original data
    for (i = 0; i < m - 1; i++)
        code[n + i] = '0';

    code[n + m - 1] = '\0';         // Mark end of string

    strcpy(temp, code);             // Copy code for CRC division

    // LOGIC: Perform modulo-2 division using XOR
    for (i = 0; i < n; i++)
    {
        if (temp[i] == '1')         // Divide only when current bit is 1
        {
            for (j = 0; j < m; j++)
                temp[i + j] =
                    (temp[i + j] == gen[j]) ? '0' : '1';
                    // XOR logic: Same bits = 0, different bits = 1
        }
    }

    // LOGIC: Append the CRC remainder to original data
    for (i = 0; i < m - 1; i++)
        code[n + i] = temp[n + i];  // Copy remainder bits

    code[n + m - 1] = '\0';         // Terminate transmitted code

    printf("CRC remainder: ");

    for (i = n; i < n + m - 1; i++)
        printf("%c", code[i]);      // Display calculated CRC remainder

    printf("\nTransmitted code: %s\n", code);
                                    // Display data + CRC remainder

    // RECEIVER SIDE: Accept transmitted/received code
    printf("Enter received code for verification: ");
    scanf("%s", temp);

    n = strlen(temp);               // Calculate received code length

    // LOGIC: Divide received code by generator using XOR
    for (i = 0; i <= n - m; i++)
    {
        if (temp[i] == '1')         // Check if current bit is 1
        {
            for (j = 0; j < m; j++)
                temp[i + j] =
                    (temp[i + j] == gen[j]) ? '0' : '1';
                    // Perform modulo-2 subtraction using XOR
        }
    }

    // LOGIC: Check whether the final remainder is zero
    for (i = 0; i < n; i++)
    {
        if (temp[i] == '1')         // If any bit is 1, error exists
        {
            error = 1;              // Set error flag
            break;                  // Stop checking
        }
    }

    // Display final verification result
    if (error)
        printf("Error detected!\n");     // Non-zero remainder
    else
        printf("No error detected.\n");  // Zero remainder

    return 0;                       // End program successfully
}

/*
HOW TO RUN IN VS CODE:

STEP 1: Open VS Code terminal.
        Shortcut: Ctrl + ~

STEP 2: Navigate to the folder containing the C file.
        If extracted folder is Downloads/CN, type:

        cd "$env:USERPROFILE\Downloads\CN"

        If the folder name is different, replace CN
        with the actual extracted folder name.

STEP 3: Compile the program:

        gcc 6.c -o 6.exe

STEP 4: Execute the program:

        .\6.exe


SAMPLE INPUT:

Enter data bits: 1101
Enter generator bits: 1011
Enter received code for verification: 1101001


EXPECTED OUTPUT:

CRC remainder: 001
Transmitted code: 1101001
No error detected.
*/
