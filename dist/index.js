"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesicBlock = new Block(0, "20202020202", "", "Hello", 123123);
let blockchain = [genesicBlock];
const getBlockchain = () => blockchain;
const getLastestBlock = () => {
    return blockchain[blockchain.length - 1];
};
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLastestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, getNewTimeStamp());
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        console.log("Not matched structure");
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        console.log("Not matched inddex");
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        console.log("Not matched hash");
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        console.log("Not matched Previous hash");
        return false;
    }
    else
        return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLastestBlock())) {
        blockchain.push(candidateBlock);
        console.log("ADDED ");
    }
    else
        console.log("NOT ADDED");
};
console.log(createNewBlock("second"));
console.log(createNewBlock("third"));
console.log(createNewBlock("bye bye"));
//# sourceMappingURL=index.js.map