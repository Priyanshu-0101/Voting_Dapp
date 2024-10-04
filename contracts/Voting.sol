// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Voting{
    struct Candidates{
        uint candidateID;
        string candidateName;
        string candidateDescription;
        uint voteCount;
    }

    uint deadline;
    bool votingStatus;
    uint countCandidates;

    mapping(address=>bool) public voters;
    mapping(uint=>Candidates) public candidate;

    event candidateAdded(uint _candidateID, string name, string description);
    event voted(uint _candidateid, address voter, bool _votingStatus);
    event eventResult(uint _candidateId, string _candidateName, uint _candidateVoteCount);
    
    function setDeadline(uint256 deadlineInMinutes) public{
        deadline = block.timestamp + (deadlineInMinutes * 1 minutes);
    }

    function addCandidate(string memory candidatename, string memory candidatedescription) public {
        require(bytes(candidatename).length > 0, "Please enter candidate name.");
        countCandidates++;
        if(bytes(candidatedescription).length == 0)
        {
            candidate[countCandidates].candidateDescription = "NA";
        }
        candidate[countCandidates] = Candidates(countCandidates, candidatename, candidatedescription, 0);
        emit candidateAdded(countCandidates, candidatename, candidatedescription);
    }

    function vote(uint candidateid) public
    {
        require((candidateid>0) && (candidateid <= countCandidates), "This candidate id is not exists.");
        require(deadline >= block.timestamp, "Voting is closed!!");
        require(voters[msg.sender] == false, "This voter has already voted.");
        Candidates storage temp = candidate[candidateid];
        voters[msg.sender] = true;
        temp.voteCount++;
        emit voted(candidateid, msg.sender, true);
    }

    function getCandidateDetails(uint candidateid) public view returns(uint, string memory, string memory, uint)
    {
        require((candidateid>0) && (candidateid <= countCandidates), "This candidate id is not exists.");
        Candidates storage temp = candidate[candidateid];
        return (candidateid, temp.candidateName, temp.candidateDescription, temp.voteCount);
    }
    
    function getDeadline() public view returns (uint)
    {
        return deadline;
    }

    function getCandidateCount() public view returns (uint)
    {
        return countCandidates;
    }

    function CheckVotersVotingStatus() public view returns(bool)
    {
        return voters[msg.sender];
    }

    function result() public returns (uint, string memory, uint)
    {
        require(countCandidates>0, "Please add candidates.");
        require(deadline<block.timestamp, "Voting still running!!");
        uint res = 1;
        for (uint i=2; i<=countCandidates; i++) 
        {
            if(candidate[res].voteCount < candidate[i].voteCount)
            {
                res = i;
            }
        }
        emit eventResult(candidate[res].candidateID, candidate[res].candidateName, candidate[res].voteCount);
        return (candidate[res].candidateID, candidate[res].candidateName, candidate[res].voteCount);
    }
    
} 

