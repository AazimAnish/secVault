// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharing {
    struct File {
        string hash;
        address uploader;
        address recipient;
    }

    File[] public files;

    function shareFile(string memory hash, address recipient) public {
        files.push(File(hash, msg.sender, recipient));
    }

    function getFile(uint256 index) public view returns (string memory, address, address) {
        return (files[index].hash, files[index].uploader, files[index].recipient);
    }
}
