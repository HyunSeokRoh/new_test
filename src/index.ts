import * as CryptoJS from "crypto-js"; 
import { createNew, isBlock } from "typescript";


class Block {
    public index: number ; 
    public hash: string ; 
    public previousHash: string; 
    public data: string; 
    public timestamp: number; 
    
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString() ; 

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string" ; 

    constructor (index: number, hash: string, previousHash: string, data: string, timestamp: number ) { 
        this.index = index; 
        this.hash = hash; 
        this.previousHash = previousHash ; 
        this.data = data; 
        this.timestamp = timestamp ; 
    }
}

const genesicBlock: Block = new Block(0, "20202020202", "", "Hello", 123123 ) ; 
let blockchain: Block[] = [genesicBlock]; 

const getBlockchain = (): Block[] => blockchain; 

const getLastestBlock = (): Block => {
    return blockchain[blockchain.length -1];
}

const getNewTimeStamp = (): number => Math.round(new Date().getTime()/1000) ; 

const createNewBlock = (data:string) : Block => {
    const previousBlock : Block = getLastestBlock(); 

    const newIndex: number = previousBlock.index + 1 ;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);  

    const newBlock: Block = new Block ( newIndex, newHash, previousBlock.hash, data, getNewTimeStamp()) ; 

    addBlock(newBlock)
    return newBlock 
}

const getHashforBlock = ( aBlock: Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data )

const isBlockValid = (candidateBlock: Block, previousBlock: Block ): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        console.log("Not matched structure") ; 
        return false; 
    }
    else if ( previousBlock.index + 1 !== candidateBlock.index ) {
        console.log("Not matched inddex") ; 
        return false; 
    }
    else if ( getHashforBlock(candidateBlock) !== candidateBlock.hash ) {
        console.log("Not matched hash") ; 
        return false; 
    }
    else if ( previousBlock.hash !== candidateBlock.previousHash ) {
        console.log("Not matched Previous hash") ; 
        return false; 
    }
    else return true; 
}

const addBlock = (candidateBlock: Block ) : void => {
    if (isBlockValid(candidateBlock , getLastestBlock()) ) {
        blockchain.push(candidateBlock) ;
        console.log( "ADDED " )
    }
    else console.log("NOT ADDED")
}

console.log(createNewBlock("second") ) ; 
console.log( createNewBlock("third")) ; 
console.log( createNewBlock("bye bye")) ; 
 export {};
