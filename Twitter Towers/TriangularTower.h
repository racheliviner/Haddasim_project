/*  Racheli Viner - ID: 325265221*/

#pragma once
#include "Tower.h"

using namespace std;

class TriangularTower : public Tower
{
public:
    void print() const override
    {
        string choice;

        cout << "If you want to calculate the perimeter of the triangle choose 'calculate perimeter' or 1,\n"
            "if you want to print it choose 'print' or 2\n";
        cin >> choice;

        if (choice == "1" || choice == "calculate perimeter")
            calculatePerimeter();

        else if (choice == "2" || choice == "print")
            printTriangle();

        else
        {
            cout << "Invalid choice. Please enter a valid option.\n";
            this->print();  // Recursive call to the function
        }
    }

protected:
    void calculatePerimeter() const
    {
        // Calculates the length of the side of the isosceles triangle
        float equalSide = pow(pow(this->towerWidth, 2) + 4 * pow(this->towerHeight, 2), 0.5) / 2;
        cout << "The perimeter of the triangle is: " << 2 * equalSide + this->towerWidth << endl;
    }

    // Prints a line in a triangle
    void printTriangleLine(int spaces, int stars) const
    {
        for (int i = 0; i < spaces; ++i)
            cout << " ";
        for (int i = 0; i < stars; ++i)
            cout << "*";
        cout << endl;
    }

    void printTriangle() const
    {
        int width = this->towerWidth;
        int height = this->towerHeight;

        if (width % 2 == 0 || width > 2 * height || width != this->towerWidth || height != this->towerHeight) {
            cout << "Error: Can't print the triangle" << endl;
            return;
        }

        //Print the first line
        cout << endl;
        int space = width / 2;
        printTriangleLine(space, 1);

        // Prints the interior of the triangle if it exists
        int innerHeight = height - 2;
        if (innerHeight)
        {
            int numOfGroups = (width - 2) / 2;  // The number of group of width
            int numOfLinesInGroup = innerHeight / numOfGroups;     // The number of lines in each group
            int numOfExtra = innerHeight % numOfGroups;       // The number of additional lines in the first group

            // Prints the remainder of the division in the first group
            for (int i = 1; i <= numOfExtra; ++i)
            {
                printTriangleLine(space - 1, 3);
            }

            for (int i = 1; i <= numOfGroups; ++i) {
                for (int j = 0; j < numOfLinesInGroup; ++j)
                {
                    printTriangleLine(space - i, width - 2 * (space - i));
                }
            }
        }

        //print the last line
        printTriangleLine(0, width);
    }
};