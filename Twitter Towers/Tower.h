/*  Racheli Viner - ID: 325265221*/

#pragma once
#include <iostream>
#include <sstream>
#include <string>

using namespace std;

class Tower
{
protected:

    // The class fields
    float towerHeight;
    float towerWidth;

    // helper functions of the class
    bool isValidNumber(const string& value)
    {
        // Check if each character in the string is a digit or a decimal point
        bool hasOnlyDigitsOrDecimal = true;
        for (char c : value) {
            if (!std::isdigit(c) && c != '.') {
                hasOnlyDigitsOrDecimal = false;
                break;
            }
        }

        // Count the number of decimal points in the string
        int decimalCount = std::count(value.begin(), value.end(), '.');

        return hasOnlyDigitsOrDecimal && decimalCount <= 1;
    }
	string invalidInputMessage(const string& message) const
    {
        return ("Invalid input. " + message + "\n");
    }

public:
    // Class constructor
    Tower()
    {
        string tempHeight, tempWidth;

        cout << "Enter the height of the building: ";
        cin >> tempHeight;

        if (!isValidNumber(tempHeight))
            throw invalidInputMessage("Please enter a valid float number.");

        this->towerHeight = stof(tempHeight);

        if (this->towerHeight < 2)
            throw invalidInputMessage("Height of building must be bigger or equal to 2");

        cout << "Enter the width of the building: ";
        cin >> tempWidth;

        if (!isValidNumber(tempWidth))
            throw invalidInputMessage("Please enter a valid float number.");

        this->towerWidth = stof(tempWidth);

        if (this->towerWidth <= 0)
            throw invalidInputMessage("Width of building must be bigger than 0");
    }

    // A virtual function that prints various data of the building
    virtual void print() const = 0;
};
