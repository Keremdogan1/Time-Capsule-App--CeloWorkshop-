// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TimeCapsule
 * @dev A contract that allows users to store messages with unlock timestamps
 */
contract TimeCapsule {
    struct Message {
        string content;
        uint256 unlockTime;
        uint256 createdAt;
    }

    // Mapping from user address to their messages
    mapping(address => Message[]) private userMessages;

    // Events
    event MessageStored(
        address indexed user,
        uint256 indexed messageIndex,
        uint256 unlockTime
    );

    /**
     * @dev Store a time-locked message
     * @param _content The message content to store
     * @param _unlockTime Unix timestamp when the message should unlock
     */
    function storeMessage(
        string memory _content,
        uint256 _unlockTime
    ) public {
        require(
            _unlockTime > block.timestamp,
            "Unlock time must be in the future"
        );
        require(bytes(_content).length > 0, "Message cannot be empty");

        userMessages[msg.sender].push(
            Message({
                content: _content,
                unlockTime: _unlockTime,
                createdAt: block.timestamp
            })
        );

        uint256 messageIndex = userMessages[msg.sender].length - 1;
        emit MessageStored(msg.sender, messageIndex, _unlockTime);
    }

    /**
     * @dev Get all messages for the caller
     * @return messages Array of all messages (both locked and unlocked)
     */
    function getAllMessages() public view returns (Message[] memory) {
        return userMessages[msg.sender];
    }

    /**
     * @dev Get only unlocked messages for the caller
     * @return unlockedMessages Array of messages that have passed their unlock time
     */
    function getUnlockedMessages()
        public
        view
        returns (Message[] memory)
    {
        uint256 count = 0;
        uint256 length = userMessages[msg.sender].length;

        // First pass: count unlocked messages
        for (uint256 i = 0; i < length; i++) {
            if (userMessages[msg.sender][i].unlockTime <= block.timestamp) {
                count++;
            }
        }

        // Second pass: populate array
        Message[] memory unlockedMessages = new Message[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < length; i++) {
            if (userMessages[msg.sender][i].unlockTime <= block.timestamp) {
                unlockedMessages[index] = userMessages[msg.sender][i];
                index++;
            }
        }

        return unlockedMessages;
    }

    /**
     * @dev Get total message count for the caller
     * @return count Total number of messages stored
     */
    function getMessageCount() public view returns (uint256) {
        return userMessages[msg.sender].length;
    }

    /**
     * @dev Get a specific message by index for the caller
     * @param index The index of the message
     * @return message The message at the given index
     */
    function getMessage(
        uint256 index
    ) public view returns (Message memory) {
        require(
            index < userMessages[msg.sender].length,
            "Message index out of bounds"
        );
        return userMessages[msg.sender][index];
    }
}

