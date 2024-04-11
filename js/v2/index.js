const g = window.gidp;
await g.babyzk.prepare();
// Check if MetaMask is installed
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
}

let web3;
const typeRegistryAddr = `0x9b10DeBa8b339BE7f57151017a95d65a7e16e90C`;
const typeRegistryAbi = `[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "InvalidTypeName",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotTypeOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TypeAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TypeDoesNotExist",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldAdmin",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "TypeAdminTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "verificationStackID",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "publicSignalGetter",
          "type": "address"
        }
      ],
      "name": "TypePublicSignalGetterUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "admin",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "definition",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "resourceURI",
          "type": "string"
        }
      ],
      "name": "TypeRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeID",
          "type": "uint160"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "oldResourceURI",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newResourceURI",
          "type": "string"
        }
      ],
      "name": "TypeResourceURIUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint8",
          "name": "verificationStackID",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "verifier",
          "type": "address"
        }
      ],
      "name": "TypeVerifierUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "calcTypeID",
      "outputs": [
        {
          "internalType": "uint160",
          "name": "",
          "type": "uint160"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        }
      ],
      "name": "getPublicSignalGetter",
      "outputs": [
        {
          "internalType": "contract IPublicSignalGetter",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "_id",
          "type": "uint160"
        }
      ],
      "name": "getType",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "revocable",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "admin",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "definition",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "resourceURI",
              "type": "string"
            }
          ],
          "internalType": "struct CredentialType",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        }
      ],
      "name": "getTypeAdmin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        }
      ],
      "name": "getVerifier",
      "outputs": [
        {
          "internalType": "contract IProofVerifier",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        }
      ],
      "name": "isRevocable",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        }
      ],
      "name": "isTypeFullyInitializedForStack",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "revocable",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "definition",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "resourceURI",
          "type": "string"
        }
      ],
      "name": "registerType",
      "outputs": [
        {
          "internalType": "uint160",
          "name": "",
          "type": "uint160"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "revocable",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "definition",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "resourceURI",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "contract IProofVerifier",
          "name": "verifier",
          "type": "address"
        },
        {
          "internalType": "contract IPublicSignalGetter",
          "name": "publicSignalGetter",
          "type": "address"
        }
      ],
      "name": "registerType1Step",
      "outputs": [
        {
          "internalType": "uint160",
          "name": "",
          "type": "uint160"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "definition",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "resourceURI",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "revocable",
              "type": "bool"
            },
            {
              "internalType": "uint8",
              "name": "verificationStackId",
              "type": "uint8"
            },
            {
              "internalType": "contract IProofVerifier",
              "name": "verifier",
              "type": "address"
            },
            {
              "internalType": "contract IPublicSignalGetter",
              "name": "publicSignalGetter",
              "type": "address"
            }
          ],
          "internalType": "struct CredentialTypeMiscConfig",
          "name": "config",
          "type": "tuple"
        }
      ],
      "name": "setPrimitiveType",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "transferTypeAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "contract IPublicSignalGetter",
          "name": "getter",
          "type": "address"
        }
      ],
      "name": "updateTypePublicSignalGetter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "string",
          "name": "uri",
          "type": "string"
        }
      ],
      "name": "updateTypeResourceURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "contract IProofVerifier",
          "name": "verifier",
          "type": "address"
        }
      ],
      "name": "updateTypeVerifier",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`;
const contextRegistryAddr = `0x010633537128AeB142619Db6Ca108EC40Df42ECc`;
const contextRegistryAbi = `[
    {
      "inputs": [],
      "name": "AlreadyExists",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "contextId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "context",
          "type": "string"
        }
      ],
      "name": "ContextRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "contextId",
          "type": "uint256"
        }
      ],
      "name": "getContext",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "context",
          "type": "string"
        }
      ],
      "name": "registerContext",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`;
const issuerRegistryAddr = `0x4143A43CA26468795d8453e77aA3D43772374683`;
const issuerRegistryAbi = `[
    {
      "inputs": [],
      "name": "InvalidName",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "IssuerAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "IssuerNotExists",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "NotIssuerOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotOwner",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PublicKeyAlreadyExists",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "PublicKeyNotExists",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldAdmin",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "IssuerAdminTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "IssuerRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "enum PublicKeyStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "name": "PublicKeyStatusUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "verificationStackId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "enabled",
          "type": "bool"
        }
      ],
      "name": "PublicKeyVerificationStackUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "contextID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "newRoot",
          "type": "bytes32"
        }
      ],
      "name": "SignatureStateRootUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint160",
          "name": "contextID",
          "type": "uint160"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newTreeURI",
          "type": "string"
        }
      ],
      "name": "SignatureStateURIUpdated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "publicKeyRaw",
          "type": "bytes"
        }
      ],
      "name": "addPublicKey",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        }
      ],
      "name": "getIssuer",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "admin",
              "type": "address"
            }
          ],
          "internalType": "struct Issuer",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        }
      ],
      "name": "getPublicKeyRaw",
      "outputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        }
      ],
      "name": "getSignatureState",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "root",
              "type": "bytes32"
            },
            {
              "internalType": "string",
              "name": "treeURI",
              "type": "string"
            }
          ],
          "internalType": "struct SignatureState",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        }
      ],
      "name": "getSignatureStateRoot",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        }
      ],
      "name": "getSignatureStateURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        }
      ],
      "name": "isPublicKeyActive",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        }
      ],
      "name": "isPublicKeyActiveForStack",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "publicKeyRaw",
          "type": "bytes"
        }
      ],
      "name": "registerIssuer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "treeURI",
          "type": "string"
        },
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        }
      ],
      "name": "setSignatureState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferIssuerAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "internalType": "enum PublicKeyStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "name": "updatePublicKeyStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "publicKeyId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "verificationStackId",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "enabled",
          "type": "bool"
        }
      ],
      "name": "updatePublicKeyVerificationStack",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "root",
          "type": "bytes32"
        }
      ],
      "name": "updateSignatureState",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint160",
          "name": "typeId",
          "type": "uint160"
        },
        {
          "internalType": "uint160",
          "name": "contextId",
          "type": "uint160"
        },
        {
          "internalType": "uint256",
          "name": "issuerId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "treeURI",
          "type": "string"
        }
      ],
      "name": "updateSignatureStateURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]`;
const babyzkVerifierAbi = `[
    {
      "inputs": [],
      "name": "getVerificationKeys",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "_proofs",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_pubSignals",
          "type": "uint256[]"
        }
      ],
      "name": "verifyProof",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]`;
const defaultPsGetter = `0x0A99615D63d3B6E3bc27CE1f1e815D21870AC691`;

const searchParams = new URLSearchParams(window.location.search);
const op = searchParams.get("op");
const chainId = searchParams.get("chainId") || "1";
const vs = searchParams.get("vs") || "1";
console.debug(`op: ${op}, chainId: ${chainId}, vs: ${vs}`);
switch (searchParams.get("op")) {
  case "registerIssuer":
    displayIssuerInfo();
    $("#registerIssuerButton").removeAttr("hidden");
    break;
  case "registerContext":
    displayContextInfo();
    $("#registerContextButton").removeAttr("hidden");
    break;
  case "registerType":
    displayTypeInfo();
    $("#registerTypeButton").removeAttr("hidden");
    break;
}

// Connect to MetaMask
async function connectToMetaMask() {
  try {
    const chainIdNum = +chainId;
    const chainIdHex = `0x${chainIdNum.toString(16)}`;

    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    // Prompt metamask to switch chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });

    $("#walletAddress").text(
      `Connected: ${account}, Chain ID: ${chainIdNum.toString(10)}`
    );

    web3 = new Web3(window.ethereum);
    $("#connectTab").hide();
    $("#operateTab").show();
  } catch (error) {
    alert(`Error connecting to MetaMask. Please try again. Error: ${error}`);
  }
}

async function getAccount() {
  const accs = await web3.eth.getAccounts();
  return accs[0];
}

// Register issuer
function getIssuerParams() {
  const name = searchParams.get("name") || "";
  const keyId = searchParams.get("pubKeyId") || "1";
  const sk = searchParams.get("sk") || "";
  const pubKey = decodeURIComponent(searchParams.get("pubKey") || "");
  return { name, vs, keyId, sk, pubKey };
}
function displayIssuerInfo() {
  const { name, keyId, sk, pubKey } = getIssuerParams();
  setOp("Issuer Info");
  addInfo("Name", name);
  addInfo("Verification Stack", vs);
  addInfo("Public Key", pubKey);
  addInfo("Public Key ID", keyId);
  addInfo("Secret Key", sk);
}
function sendRegisterIssuerTx(name, keyId, pubKey) {
  return new Promise(async (resolve, reject) => {
    const account = await getAccount();
    const contract = new web3.eth.Contract(
      JSON.parse(issuerRegistryAbi),
      issuerRegistryAddr
    );
    // check is issuer exist
    let issuerRegistered = true;
    let tx;
    let op;
    try {
      await contract.methods.getIssuer(account).call();
    } catch {
      issuerRegistered = false;
    }
    if (issuerRegistered) {
      op = "Update public key";
      addLog(`Issuer already registered, update public key ${keyId}`);
      // add key
      tx = contract.methods.addPublicKey(
        account,
        BigInt(vs),
        BigInt(keyId),
        pubKey
      );
    } else {
      op = "Register issuer";
      addLog(`Issuer not registered, register issuer ${name}`);
      // register
      tx = contract.methods.registerIssuer(
        name,
        BigInt(vs),
        BigInt(keyId),
        pubKey
      );
    }

    // let gas = await tx.estimateGas();
    // if (gas < 300000) {
    //   gas = 300000;
    // }
    // send this tx.
    const receipt = await tx
      .send({
        // used first account from your wallet.
        from: account,
        // gas,
      })
      .on("transactionHash", (txhash) => {
        addLog(`${op} transaction ... tx: ${txhash}`);
        // $("#txHash").text(`Mining transaction ... tx: ${txhash}`);
      })
      .on("error", function (error) {
        addLog(`An error happened: ${JSON.stringify(error)}`);
        reject(error);
      })
      .then(function (receipt) {
        console.debug(receipt);
        const issuerId =
          receipt.events.PublicKeyStatusUpdated.returnValues.issuerId;
        const keyId =
          receipt.events.PublicKeyStatusUpdated.returnValues.publicKeyId;
        resolve({ issuerId, keyId, account });
      });
  });
}
function registerIssuerSuccess(issuerId, issuer, name, pubKey, keyId, sk) {
  return new Promise((resolve, reject) => {
    $.post(
      "/issuer/register",
      {
        issuerId,
        issuer,
        name,
        keyId,
        sk,
        chainId,
        vs,
        pubKey,
      },
      () => {
        resolve();
      }
    ).fail((error) => {
      reject(error);
    });
  });
}
async function registerIssuer() {
  const { name, pubKey, keyId, sk } = getIssuerParams();
  if (!name) {
    alert("Empty name");
    return;
  }
  if (!keyId) {
    alert("Empty public key id");
    return;
  }
  if (!sk) {
    alert("Empty encrypted secret key");
    return;
  }
  if (!pubKey) {
    alert("Empty public key");
    return;
  }

  try {
    addLog(`Start register issuer "${name}"`);
    const { issuerId, account } = await sendRegisterIssuerTx(
      name,
      keyId,
      pubKey
    );
    addLog(
      `Issuer ${issuerId} pub key ${pubKey} pub key id ${keyId} register success`
    );
    await registerIssuerSuccess(issuerId, account, name, pubKey, keyId, sk);
    shutdownAndClose();
  } catch (e) {
    console.error(`Register issuer error: ${e}`);
  }
}

// Register context
function getContextParams() {
  const context = decodeURIComponent(searchParams.get("context") || "");
  return { context };
}
function displayContextInfo() {
  const { context } = getContextParams();
  if (!context) {
    alert("Empty context");
    return;
  }
  setOp("Context Info");
  addInfo("Context", context);
}
function sendRegisterContextTx(context) {
  return new Promise(async (resolve, reject) => {
    const account = await getAccount();
    const contract = new web3.eth.Contract(
      JSON.parse(contextRegistryAbi),
      contextRegistryAddr
    );
    const tx = contract.methods.registerContext(context);
    let gas = await tx.estimateGas();
    if (gas < 100000) {
      gas = 100000;
    }
    // send this tx.
    const receipt = await tx
      .send({
        // used first account from your wallet.
        from: account,
        gas,
      })
      .on("transactionHash", (txhash) => {
        addLog(`Register context transaction ... tx: ${txhash}`);
      })
      .on("error", function (error) {
        addLog(
          `An error happened when register context: ${JSON.stringify(error)}`
        );
        reject(error);
      })
      .then(function (receipt) {
        console.debug(receipt);
        const id = receipt.events.ContextRegistered.returnValues.contextId;
        resolve({ id, context });
      });
  });
}
function registerContextSuccess(id, context) {
  return new Promise((resolve, reject) => {
    $.post(
      "/context/register",
      {
        context,
        id,
        vs,
        chainId,
      },
      () => {
        resolve({});
      }
    ).fail((error) => {
      reject(error);
    });
  });
}
async function registerContext() {
  const { context } = getContextParams();
  if (!context) {
    alert("Empty context");
    return;
  }
  try {
    addLog(`Start register context "${context}"`);
    const { id } = await sendRegisterContextTx(context);
    addLog(`Success: Context ${context} register success`);
    await registerContextSuccess(id, context);
    shutdownAndClose();
  } catch (e) {
    console.error(`Register context error: ${e}`);
  }
}

// Register type
function getTypeParams() {
  const id = searchParams.get("id") || "";
  const name = decodeURIComponent(searchParams.get("name") || "");
  const definition = decodeURIComponent(searchParams.get("definition") || "");
  const description = decodeURIComponent(searchParams.get("description") || "");
  const creator = searchParams.get("creator") || "";
  const resourceUri = searchParams.get("resourceUri") || "";
  const vkeyUri = searchParams.get("vkeyUri") || "";
  const crafter = searchParams.get("crafter") || "";
  const revocable = searchParams.get("revocable") || false;
  return {
    id,
    name,
    definition,
    description,
    creator,
    resourceUri,
    vkeyUri,
    crafter,
    revocable,
  };
}
function displayTypeInfo() {
  const {
    id,
    name,
    definition,
    description,
    creator,
    resourceUri,
    vkeyUri,
    revocable,
  } = getTypeParams();
  setOp("Type Info");
  addInfo("ID", id);
  addInfo("Name", name);
  addInfo("Definition", definition);
  addInfo("Description", description);
  addInfo("Creator", creator);
  addInfo("ResourceUri", resourceUri);
  addInfo("VKey Uri", vkeyUri);
  addInfo("Revocable", revocable);
}
async function registerType() {
  const {
    id,
    name,
    definition,
    description,
    creator,
    resourceUri,
    vkeyUri,
    revocable,
    crafter,
  } = getTypeParams();

  if (!name) {
    alert("Empty name");
    return;
  }
  if (!definition) {
    alert("Empty definition");
    return;
  }
  if (!description) {
    alert("Empty description");
    return;
  }
  if (!creator) {
    alert("Empty creator");
    return;
  }
  if (!chainId) {
    alert("Empty chainId");
    return;
  }
  if (!crafter) {
    alert("Empty crafter");
    return;
  }
  const account = await getAccount();
  if (account.toLowerCase() !== creator.toLowerCase()) {
    alert(`Connected wallet must match creator ${creator}`);
    return;
  }
  console.debug(
    `register type. caller: ${account}. args: \nname: ${name}\n definition: ${definition}\ndescription: ${description}\nresourceUri: ${resourceUri}\nvkeyUri: ${vkeyUri}\nchainId: ${chainId}\nr: ${revocable}\ncrafter: ${crafter}`
  );
  try {
    addLog(`Start register type "${name}"`);
    const { typeId } = await calcTypeID(name);
    console.debug("typeId", typeId);
    addLog(`Type ID: ${typeId}`);
    addLog(`Start download vkey ${vkeyUri}`);
    const vk = await downloadIPFS(vkeyUri);
    addLog(`Download success`);
    addLog(vk);
    addLog(`Start generate Solidity`);
    const verifierSolidity = await generateSolidity(definition, vk);
    addLog(`Generate success`);
    addLog(verifierSolidity);
    // console.debug("solidity", solidity);
    addLog(`Start compile solidity`);
    const { abi, bin, solidity } = await compileSolidity(
      typeId,
      verifierSolidity,
      crafter
    );
    addLog("ABI", abi);
    addLog("BIN", bin);
    addLog(`Compile success`);
    addLog(`Start download bytecode ${bin}`);
    const binCode = await downloadIPFS(bin);
    addLog(`Bytecode download success`);
    // console.debug("bin", binCode);
    addLog(`Start depoly ${name} proof Verifier`);
    const { verifierAddress } = await deployVerifier(typeId, binCode);
    addLog(`Verifier deployed success, address: ${verifierAddress}`);
    // console.debug("deploy verifier", verifierAddress);
    addLog(`Register type ${name}`);
    await sendRegisterTypeTx(
      name,
      definition,
      description,
      resourceUri,
      verifierAddress,
      revocable
    );
    addLog(`Register type tx success`);

    await registerTypeSuccess(
      id,
      name,
      definition,
      description,
      resourceUri,
      creator,
      abi,
      bin,
      solidity
    );
    addLog(`Register type success`);
    shutdownAndClose();
  } catch (e) {
    console.error(`Register type error: ${e}`);
  }
}

function calcTypeID(name) {
  return new Promise(async (resolve, reject) => {
    const account = await getAccount();
    const contract = new web3.eth.Contract(
      JSON.parse(typeRegistryAbi),
      typeRegistryAddr
    );
    // send register type tx
    const typeId = await contract.methods.calcTypeID(account, name).call();
    resolve({ typeId });
  });
}

function sendRegisterTypeTx(
  name,
  definition,
  description,
  resourceUri,
  verifierAddress,
  revocable
) {
  return new Promise(async (resolve, reject) => {
    const account = await getAccount();
    const contract = new web3.eth.Contract(
      JSON.parse(typeRegistryAbi),
      typeRegistryAddr
    );
    // send register type tx
    const tx = contract.methods.registerType1Step(
      revocable,
      name,
      definition,
      description,
      resourceUri,
      BigInt(vs),
      verifierAddress,
      defaultPsGetter
    );
    let gas = await tx.estimateGas();
    if (gas <= 500000) {
      gas = 500000;
    }
    tx.send({
      from: account,
      gas,
    })
      .on("transactionHash", (txhash) => {
        addLog(`Register type transaction ... tx: ${txhash}`);
      })
      .on("error", function (error) {
        addLog(`An error happened: ${JSON.stringify(error)}`);
        reject(error);
      })
      .then(function (receipt) {
        console.debug(receipt);
        const typeId = receipt.events.TypeRegistered.returnValues.id;
        resolve({ typeId });
      });
  });
}

function registerTypeSuccess(
  id,
  name,
  definition,
  description,
  resourceUri,
  creator,
  abi,
  bin,
  solidity
) {
  return new Promise((resolve, reject) => {
    $.post(
      "/type/register",
      {
        id,
        name,
        definition,
        description,
        resourceUri,
        creator,
        chainId,
        vs,
        abi,
        bin,
        solidity,
      },
      () => {
        resolve({});
      }
    ).fail((error) => {
      reject(error);
    });
  });
}

// Download ipfs file
function downloadIPFS(ipfsUri) {
  return new Promise((resolve, reject) => {
    ipfsUri = ipfsToHttp(ipfsUri);
    $.get(ipfsUri, (data) => {
      console.debug(data);
      resolve(data);
    }).fail((error) => {
      reject(`Download ${ipfsUri} failed: ${error}`);
    });
  });
}
// Generate Verifier Solidity
async function generateSolidity(tpDef, vkey) {
  const claimsResult = g.credType.parseCredType(tpDef);
  if (!claimsResult.ok) {
    throw claimsResult.error;
  }
  const tp = claimsResult.value;
  const circuit = g.babyzk.genCircuit(tp);
  return await g.babyzk.genOnChainVerifierCode(circuit, vkey);
}
// Compile Solidity
function compileSolidity(typeId, solidity, crafter) {
  return new Promise((resolve, reject) => {
    $.post(
      "/type/compile-verifier-solidity",
      {
        typeId,
        solidity,
        crafter,
      },
      (resp) => {
        /*{
              "code": 1,
              "data": {
                  "abi": "ipfs://bafybeib7blylqnip2hjcwfdfgmwnljz6ceddq6htw2s4dporxptiohcize/abi.json",
                  "bin": "ipfs://bafybeib7blylqnip2hjcwfdfgmwnljz6ceddq6htw2s4dporxptiohcize/bin.json",
                  "solidity": "ipfs://bafybeib7blylqnip2hjcwfdfgmwnljz6ceddq6htw2s4dporxptiohcize/verifier.sol"
              }
            }*/
        if (resp.code !== 1) {
          reject(resp.error);
        }
        resolve(resp.data);
      }
    ).fail((error) => {
      reject(error);
    });
  });
}
// Deploy Verifier
function deployVerifier(typeId, bytecode) {
  return new Promise(async (resolve, reject) => {
    const contract = new web3.eth.Contract(JSON.parse(babyzkVerifierAbi));
    // if bytecode not start with 0x, add it.
    if (!bytecode.startsWith("0x")) {
      bytecode = `0x${bytecode}`;
    }
    const tx = contract.deploy({ data: bytecode });
    let gas = await tx.estimateGas();
    gas += 200000;
    const account = await getAccount();
    tx.send({
      // used first account from your wallet.
      from: account,
      gas,
    })
      .on("transactionHash", (txhash) => {
        addLog(`Deploy verifier transaction ... tx: ${txhash}`);
      })
      .on("error", function (error) {
        addLog(`An error happened: ${JSON.stringify(error)}`);
        reject(error);
      })
      .then(function (receipt) {
        console.debug(receipt);
        const verifierAddress = receipt["_address"];
        resolve({ verifierAddress });
      });
  });
}
// Register verifier
function registerVerifier(typeId, verifierAddress) {
  return new Promise(async (resolve, reject) => {
    const contract = new web3.eth.Contract(
      JSON.parse(verifierRegistryAbi),
      verifierRegistryAddr
    );
    const tx = contract.methods.registerVerifier(typeId, verifierAddress);
    const account = await getAccount();
    debugger;
    const gas = 2000000; // 2m
    // const gas = await tx.estimateGas();
    tx.send({
      // used first account from your wallet.
      from: account,
      gas,
    })
      .on("transactionHash", (txhash) => {
        addLog(`Register verifier transaction ... tx: ${txhash}`);
      })
      .on("error", function (error) {
        addLog(`An error happened: ${JSON.stringify(error)}`);
        reject(error);
      })
      .then(function (receipt) {
        console.debug(receipt);
        resolve({});
      });
  });
}
// Shutdown server
function shutdown() {
  $.ajax({
    url: "/shutdown",
    type: "POST",
    data: {},
    dataType: "json",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

function shutdownAndClose() {
  setTimeout(() => {
    shutdown();
    // setTimeout(()=>{
    //  window.close();
    // }, 500);
  }, 1000);
}
// utils
function ipfsToHttp(ipfs) {
  // Replace all occurrences of 'ipfs://'
  ipfs = ipfs.replace(/ipfs:\/\//g, "");

  // https://bafkreidjxuz4t4ogtspjffl2jisdkxi2pzhl3lke3rraxb6onvuarlyqze.ipfs.nftstorage.link/

  const parts = ipfs.split("/");

  if (parts.length === 1) {
    return `https://${parts[0]}.ipfs.nftstorage.link/`;
  }

  // Join the parts starting from the second part with '/'
  return `https://${parts[0]}.ipfs.nftstorage.link/${parts.slice(1).join("/")}`;
}

function setOp(op) {
  $("#op").text(op);
}

function addInfo(key, value) {
  $("#info").append(
    `<div class="info"><span class="info-key">${key}</span><span class="info-value">${value}</span></div>`
  );
}

function addLog(message) {
  $("#logContainer").show();
  $("#logContainer").append(`<div class="log-item">${message}</div>`);
  $("#logContainer").scrollTop($("#logContainer")[0].scrollHeight);
}

// Event listener for the button
$("#connectButton").click(() => {
  connectToMetaMask();
});
$("#shutdownButton").click(() => {
  shutdown();
});
$("#registerIssuerButton").click(() => {
  registerIssuer();
});
$("#registerContextButton").click(() => {
  registerContext();
});
$("#registerTypeButton").click(async () => {
  registerType();
});
