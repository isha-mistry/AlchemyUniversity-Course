// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Main {
    function makeCallAttempt(address winner) external {
        (bool success, ) = winner.call(abi.encodeWithSignature("attempt()"));
        require(success);
    }
}
