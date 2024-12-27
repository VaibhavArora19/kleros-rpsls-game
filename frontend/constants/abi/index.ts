export const ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_c1",
        type: "uint8",
      },
      {
        name: "_c2",
        type: "uint8",
      },
    ],
    name: "win",
    outputs: [
      {
        name: "w",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "j2Timeout",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "stake",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "c2",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "c1Hash",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_c2",
        type: "uint8",
      },
    ],
    name: "play",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "j2",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "lastAction",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_c1",
        type: "uint8",
      },
      {
        name: "_salt",
        type: "uint256",
      },
    ],
    name: "solve",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "j1",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "j1Timeout",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "TIMEOUT",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "_c1Hash",
        type: "bytes32",
      },
      {
        name: "_j2",
        type: "address",
      },
    ],
    payable: true,
    stateMutability: "payable",
    type: "constructor",
  },
];

export const BYTECODE =
  "0x6080604081815261012c600555806107398339810160405280516020909101513460045560008054600160a060020a0319908116331790915560018054600160a060020a0390931692909116919091179055600255426006556106d2806100676000396000f3006080604052600436106100b95763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416630c4395b981146100be578063294914a4146100f35780633a4b66f11461010a57806348e257cb146101315780634d03e3d21461016a57806353a04b051461017f57806380985af91461018d57806389f71d53146101cb578063a5ddec7c146101e0578063c37597c6146101fe578063c839114214610213578063f56f48f214610228575b600080fd5b3480156100ca57600080fd5b506100df60ff6004358116906024351661023d565b604080519115158252519081900360200190f35b3480156100ff57600080fd5b506101086102f9565b005b34801561011657600080fd5b5061011f610366565b60408051918252519081900360200190f35b34801561013d57600080fd5b5061014661036c565b6040518082600581111561015657fe5b60ff16815260200191505060405180910390f35b34801561017657600080fd5b5061011f610375565b61010860ff6004351661037b565b34801561019957600080fd5b506101a2610408565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b3480156101d757600080fd5b5061011f610424565b3480156101ec57600080fd5b5061010860ff6004351660243561042a565b34801561020a57600080fd5b506101a2610611565b34801561021f57600080fd5b5061010861062d565b34801561023457600080fd5b5061011f6106a0565b600081600581111561024b57fe5b83600581111561025757fe5b1415610265575060006102f3565b600083600581111561027357fe5b1415610281575060006102f3565b600282600581111561028f57fe5b81151561029857fe5b0660028460058111156102a757fe5b8115156102b057fe5b0614156102d7578160058111156102c357fe5b8360058111156102cf57fe5b1090506102f3565b8160058111156102e357fe5b8360058111156102ef57fe5b1190505b92915050565b600060035460ff16600581111561030c57fe5b1461031657600080fd5b60055460065401421161032857600080fd5b6000805460045460405173ffffffffffffffffffffffffffffffffffffffff9092169281156108fc029290818181858888f150506000600455505050565b60045481565b60035460ff1681565b60025481565b600060035460ff16600581111561038e57fe5b1461039857600080fd5b60008160058111156103a657fe5b14156103b157600080fd5b60045434146103bf57600080fd5b60015473ffffffffffffffffffffffffffffffffffffffff1633146103e357600080fd5b6003805482919060ff191660018360058111156103fc57fe5b02179055505042600655565b60015473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b600082600581111561043857fe5b141561044357600080fd5b600060035460ff16600581111561045657fe5b141561046157600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff16331461048557600080fd5b600254604051839083908083600581111561049c57fe5b60ff167f0100000000000000000000000000000000000000000000000000000000000000028152600101828152602001925050506040518091039020600019161415156104e857600080fd5b6003546104f990839060ff1661023d565b15610541576000805460045460405173ffffffffffffffffffffffffffffffffffffffff90921692600290910280156108fc02929091818181858888f1935050505050610608565b6003546105519060ff168361023d565b156105985760015460045460405173ffffffffffffffffffffffffffffffffffffffff90921691600290910280156108fc02916000818181858888f1935050505050610608565b6000805460045460405173ffffffffffffffffffffffffffffffffffffffff9092169281156108fc029290818181858888f1505060015460045460405173ffffffffffffffffffffffffffffffffffffffff909216945080156108fc02935091506000818181858888f150505050505b50506000600455565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b600060035460ff16600581111561064057fe5b141561064b57600080fd5b60055460065401421161065d57600080fd5b60015460045460405173ffffffffffffffffffffffffffffffffffffffff90921691600290910280156108fc02916000818181858888f150506000600455505050565b600554815600a165627a7a72305820af7ee93a4305a17ac8ea005045fa6402953d766a3552ba3288cd4cce6b167dbf0029";
