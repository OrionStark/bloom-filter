const { createHash, getHashes } = require('crypto');
class BloomFilters {
    /**
     * Bloom Filters Constructor
     * @param {number} storageLength Bit vector storage size
     * @param {Array<string>} hashFunctions  Lsit of hash algorithms, arr length = total hash functions
     */
    constructor(storageLength, hashFunctions) {
        this.availableHash = getHashes();
        this.hashFunctions = hashFunctions;
        this.validateHashAlgorithm();
        this.bitStorage = Array(storageLength - 1).fill(0);
    }

    validateHashAlgorithm() {
        this.hashFunctions.forEach(alg => {
            if ( this.availableHash.findIndex(avlAlgo => avlAlgo === alg) === -1 ) {
                throw Error(`${alg.toUpperCase()} is not supported or invalid algorithm name`);
            }
        });
    }

    insertData(payload) {
        const hashes = this.hashFunctions.map(h => {
            return this.hash(payload, h);
        });
        hashes.forEach(index => {
            this.bitStorage[index] = 1;
        });
    }

    isExist(payload) {
        const hashes = this.hashFunctions.map(h => {
            return this.hash(payload, h);
        });
        let flag = false;
        hashes.forEach(hash => {
            flag = this.bitStorage[hash] === 1;
        });
        return flag;
    }

    hash(payload, algo) {
        const hashValue = createHash(algo).update(payload).digest('base64');
        return Math.abs(hashValue.split('').map(i => i.charCodeAt(0)).reduce((a, b) => a + b, 0) % this.bitStorage.length - 1);
    }

    getStorage() {
        return this.bitStorage;
    }
}

module.exports = BloomFilters;
