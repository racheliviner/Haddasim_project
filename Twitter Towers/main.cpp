/*  Racheli Viner - ID: 325265221*/

#include <iostream>
#include <string>
#include "Tower.h"
#include "RectangularTower.h"
#include "TriangularTower.h"

using namespace std;

int main() {

    string userChoice;

    do {
        cout << "\nPlease select:\n"
             << "'rectangular tower' or 1\n"
             << "'triangular tower' or 2\n"
             << "'exit' or 3\n";

        cin >> userChoice;

        if (userChoice == "rectangular tower" || userChoice == "1") {
            try
            {
                Tower* rectangularTower = new RectangularTower();
                rectangularTower->print();
                delete rectangularTower;
            }
            catch (string message)
            {
                cout << message;
            }
        }
        else if (userChoice == "triangular tower" || userChoice == "2") {
            try
            {
                Tower* triangularTower = new TriangularTower();
                triangularTower->print();
                delete triangularTower;
            }
            catch (string message)
            {
                cout << message;
            }
        }
        else if (userChoice == "exit" || userChoice == "3") {
            break;
        }
        else {
            cout << "Invalid choice. Please enter a valid option.\n";
        }
    } while (true);

    return 0;
}
