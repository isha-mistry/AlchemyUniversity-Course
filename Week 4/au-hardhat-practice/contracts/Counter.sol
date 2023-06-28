//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    uint public count;

    //funtion to get current count
    function get() public view returns (uint) {
        return count;
    }

    // funtion to increment count by 1
    function inc() public {
        count += 1;
    }

    // funtion to decrement count by 1
    function dec() public {
        count -= 1;
    }
}
