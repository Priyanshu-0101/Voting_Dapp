async function connectContract() {
  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidatename",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "candidatedescription",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_candidateID",
          "type": "uint256"
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
          "name": "description",
          "type": "string"
        }
      ],
      "name": "candidateAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_candidateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_candidateName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_candidateVoteCount",
          "type": "uint256"
        }
      ],
      "name": "eventResult",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "result",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
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
          "internalType": "uint256",
          "name": "deadlineInMinutes",
          "type": "uint256"
        }
      ],
      "name": "setDeadline",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateid",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_candidateid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "_votingStatus",
          "type": "bool"
        }
      ],
      "name": "voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "candidateID",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "candidateDescription",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "CheckVotersVotingStatus",
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
      "name": "getCandidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "candidateid",
          "type": "uint256"
        }
      ],
      "name": "getCandidateDetails",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDeadline",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
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
  ];
  const Address = "0x9642281eCb3234D7daa66c77F0E2ae9a6ed840b9";  // Contract Address
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
}
connectContract();

let account;
let connectionStatus = false;
const connectMetamask = async () => {
  if (window.ethereum !== "undefined") {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account = accounts[0];
    document.getElementById(
      "accountArea"
    ).innerHTML = `Connection Status:Connected <br/><br/>
    Account is: ${account}`;
    connectionStatus = true;
  }
};


const addCandidate = async () => {
  if (connectionStatus) {
    const dtime = await window.contract.methods.getDeadline().call();
    var t = new Date(dtime * 1000).toISOString().slice(0, 19).replace("T", " ");
    const current_t = new Date()
      .toISOString("en-US")
      .slice(0, 19)
      .replace("T", " ");
    if (t > current_t) {
      alert("Voting is running. You cannot add candidate for now!");
      return;
    }

    if (account == 0xff29ec61fa6571f9078ceca19595c9507c123199) {
      location.href = "../html/addcandidatepage.html";
    } else {
      alert("!! Only admin can add candidate !!");
    }
  } else {
    alert("Alert: First Connect With Metamask.");
  }
};

const giveVote = async () => {
  try {
    if (connectionStatus) {
      const d = await window.contract.methods.getDeadline().call();
      var s = new Date(d * 1000).toISOString().slice(0, 19).replace("T", " ");
      const current_time = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      if (s < current_time) {
        alert("!! Voting Over !!");
        return;
      }

      // await window.contract.methods
      //   .CheckVotersVotingStatus()
      //   .call({ from: account })
      //   .then(function (check) {
      //     if (check == true) {
      //       alert("You already voted !!");
      //     } else {
      location.href = "../html/votingpage.html";
      //   }
      // });
    } else {
      alert("Alert: First Connect With Metamask.");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const votingResult = async () => {
  try {
    if (connectionStatus) {
      const dtime = await window.contract.methods.getDeadline().call();
      var t = new Date(dtime * 1000)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      const current_t = new Date()
        .toISOString("en-US")
        .slice(0, 19)
        .replace("T", " ");
      if (t > current_t) {
        alert("Voting Still Running.. Wait until voting is not closed!!");
        return;
      }
      location.href = "../html/resultpage.html";
    } else {
      alert("Alert: First Connect With Metamask.");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const addCandi = async () => {
  try {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
      connectionStatus = true;
    }

    if (connectionStatus) {
      var name = $("#name").val();
      var description = $("#description").val();
      if (!name || !description) {
        alert("Please enter some values!!");
      } else {
        await window.contract.methods
          .addCandidate(name, description)
          .send({ from: account });
        alert("Candidate added successfully!!");
      }
    } else {
      alert("!! Your Metamask Account not connected properly !!");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const SetDeadline = async () => {
  try {
    if (connectionStatus) {
      const dl = parseInt(document.getElementById("deadline").value);
      if (!dl) {
        alert("Enter an Integer value.");
        return;
      } else {
        await window.contract.methods.setDeadline(dl).send({ from: account });
        alert("Deadline set successfully!!");
      }
      $("#deadlineSubmit").prop("disabled", true);
    } else {
      alert("!! Your Metamask Account not connected properly !!");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const showCandidates = async () => {
  try {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
      connectionStatus = true;
    }
    const time = await window.contract.methods.getDeadline().call();
    var s = new Date(time * 1000).toLocaleString();
    document.getElementById("Deadline").innerHTML = `${s}`;
    document.getElementById(
      "votingComment"
    ).innerHTML = `Select one of the candidate to vote and click the vote button to give your valuable vote.`;
    if (connectionStatus) {
      const countCandidates = await window.contract.methods
        .getCandidateCount()
        .call();
      for (var i = 1; i <= countCandidates.length; i++) {
        await window.contract.methods
          .getCandidateDetails(i)
          .call()
          .then(function (data) {
            var id = data[0];
            var name = data[1];
            var description = data[2];
            var voteCount = data[3];
            var viewCandidates =
              `<tr><td> <input class="form-check-input" type="radio" name="candidate" value="${id}" id=${id}>` +
              id +
              "</td><td>" +
              name +
              "</td><td>" +
              description +
              "</td></tr>";
            $("#candidateBox").append(viewCandidates);
          });
      }
      $("#showCandi").prop("disabled", true);
    } else {
      alert("!! Your Metamask Account not connected properly !!");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const voteHere = async () => {
  try {
    if (connectionStatus) {
      await window.contract.methods
        .CheckVotersVotingStatus()
        .call({ from: account })
        .then(function (check) {
          if (check == true) {
            alert("You already voted !!");
            location.href = "../html/homepage.html";
          } else {
            async function run() {
              var candidateID = $("input[name='candidate']:checked").val();
              if (!candidateID) {
                $("#msg").html("<p>Please vote for a candidate.</p>");
                return;
              }
              await window.contract.methods
                .vote(candidateID)
                .estimateGas({ gas: 2000000 }, function (error, gasAmount) {
                  if (gasAmount == 200000) {
                    console.log("Method ran out of gas");
                    return;
                  }
                });
              await window.contract.methods
                .vote(candidateID)
                .send({ from: account })
                .then((result) => {
                  $("#voteButton").attr("disabled", true);
                  $("#msg").html("<p>Voted</p>");
                  window.location.reload(1);
                });
            }
            run();
          }
        });
    } else {
      alert("!! Your Metamask Account not connected properly !!");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};

const showResult = async () => {
  try {
    if (window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];
      connectionStatus = true;
    }
    if (connectionStatus) {
      const countCandidates = await window.contract.methods
        .getCandidateCount()
        .call();
      for (var i = 1; i <= countCandidates.length; i++) {
        await window.contract.methods
          .getCandidateDetails(i)
          .call()
          .then(function (data) {
            var id = data[0];
            var name = data[1];
            var description = data[2];
            var voteCount = data[3];
            var viewCandidates = `<tr><td> 
              ${id} 
              </td><td> 
              ${name} 
              </td><td> 
              ${voteCount} 
              </td></tr>`;
            $("#candidateBox").append(viewCandidates);
          });
      }
      await window.contract.methods
        .result()
        .call()
        .then(function (temp) {
          var candidateId = temp[0];
          var candidatename = temp[1];
          var count = temp[2];
          document.getElementById(
            "showResult"
          ).innerHTML = `<h3 align="center">Congrats</h3> <br/>
        <p align="center">!! ${candidateId}: ${candidatename} win with ${count} votes !!</p>`;
        });
      $("h3").css("margin", "0");
      $("h3").css("padding", "0");
      $("p").css("margin", "0");
      $("p").css("padding", "0");
      $("#displayResult").prop("disabled", true);
    } else {
      alert("!! Your Metamask Account not connected properly !!");
    }
  } catch (error) {
    console.error("ERROR! " + error.message);
  }
};
