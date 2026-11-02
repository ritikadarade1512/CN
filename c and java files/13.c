
#include <stdio.h>

#define INF 9999  // Represents infinity (no direct connection)

int main() {
    int n, cost[10][10];
    int dist[10], visited[10] = {0};
    int i, j, src, min, u;

    // STEP 1: Accept number of vertices
    printf("Enter number of vertices: ");
    scanf("%d", &n);

    // STEP 2: Accept adjacency matrix
    // Logic: Store edge weights between vertices
    printf("Enter cost adjacency matrix:\n");

    for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
            scanf("%d", &cost[i][j]);
        }
    }

    // STEP 3: Accept source vertex
    printf("Enter source vertex (0 to %d): ", n - 1);
    scanf("%d", &src);

    // STEP 4: Initialize distances from source
    // Logic: Initially, distance is the direct edge cost
    for (i = 0; i < n; i++) {
        dist[i] = cost[src][i];
    }

    dist[src] = 0;       // Distance from source to itself is zero
    visited[src] = 1;    // Mark source vertex as visited

    // STEP 5: Find shortest paths to all vertices
    for (i = 1; i < n; i++) {

        min = INF;
        u = -1;

        // LOGIC 1: Find the unvisited vertex with minimum distance
        for (j = 0; j < n; j++) {
            if (!visited[j] && dist[j] < min) {
                min = dist[j];
                u = j;
            }
        }

        // If no reachable vertex is found, stop
        if (u == -1)
            break;

        // LOGIC 2: Mark the selected vertex as visited
        visited[u] = 1;

        // LOGIC 3: Update distances of neighbouring vertices
        // If a shorter path is found, replace the old distance
        for (j = 0; j < n; j++) {
            if (!visited[j] && cost[u][j] != INF &&
                dist[u] + cost[u][j] < dist[j]) {

                dist[j] = dist[u] + cost[u][j];
            }
        }
    }

    // STEP 6: Display shortest distances
    printf("\nShortest distances from source vertex %d:\n", src);

    for (i = 0; i < n; i++) {
        if (dist[i] == INF)
            printf("Vertex %d : Unreachable\n", i);
        else
            printf("Vertex %d : %d\n", i, dist[i]);
    }

    return 0;
}

/*
HOW TO RUN IN VS CODE:

STEP 1: Open VS Code terminal (Ctrl + ~).

STEP 2: Navigate to the folder:
        cd "C:\Users\Ritika\Downloads\CN\c and java files"

STEP 3: Compile the program:
        gcc 13.c -o 13.exe

STEP 4: Run the program:
        .\13.exe
Enter number of vertices: 5
Enter cost adjacency matrix:
0 10 9999 30 100
9999 0 50 9999 9999
9999 9999 0 20 10
9999 9999 9999 0 60
9999 9999 9999 9999 0

Enter source vertex (0 to 4): 0

Shortest distances from source vertex 0:
Vertex 0 : 0
Vertex 1 : 10
Vertex 2 : 60
Vertex 3 : 30
Vertex 4 : 70
*/
