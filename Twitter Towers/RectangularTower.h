/*  Racheli Viner - ID: 325265221*/

#pragma once
#include "Tower.h"

class RectangularTower : public Tower
{
public:
    void print() const override
    {
        float difference = abs(this->towerHeight - this->towerWidth);

        //Checks if the rectangle is a square or if the difference in the lengths of its sides is greater than 5
        if (difference == 0 || difference > 5)
            cout << "The area of the rectangular tower is: " << this->towerWidth * this->towerHeight << endl;
        else
            cout << "The perimeter of the rectangular tower is: " << 2 * (this->towerWidth + this->towerHeight) << endl;
    }
};
