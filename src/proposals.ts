import hre from "hardhat";
import GovernorAlpha from "./abi/CompoundGovernorAlpha.json";

export async function fetchProposals(contractAddress: any) {
  const contract = new hre.ethers.Contract(
    contractAddress,
    GovernorAlpha,
    hre.ethers.provider
  );

  const proposalCount = (await contract.proposalCount()).toNumber();
  await Promise.all(
    Array.from({ length: proposalCount }, (v, i) => i + 1).map(
      async (idx: number) => {
        await getProposal(idx, contract);
        await getVotes(idx, contract);
      }
    )
  );
}

async function getProposal(proposalId: number, contract: any) {
  const delay = await contract.votingDelay();
  const state = await contract.state(proposalId);
  const proposal = await contract.proposals(proposalId);
  const { id, startBlock, endBlock } = proposal;

  // Convert [BigNumber] to number where necessary for formatting and data cleanliness
  const idNum = id.toNumber();
  const startBlockNum = startBlock.toNumber();
  const endBlockNum = endBlock.toNumber();

  // Filter for all [ProposalCreated] events
  const createEventFilter = contract.filters.ProposalCreated();
  const creationEvents = await contract.queryFilter(
    createEventFilter,
    startBlockNum - delay.toNumber() - 5,
    startBlockNum + 5
  );

  // Find proposal creation event with same proposal ID (in the event multiple events within smart/end blocks)
  // throws is no creation event is found, we can't have a proposal without a creation event
  const createEvent = creationEvents.find(
    (cEvent: any) => cEvent.args.id.toNumber() === proposalId
  );

  console.log(`Retrieved proposal: JSON=${JSON.stringify(proposal)}`);
}

async function getVotes(proposalId: number, contract: any) {
  const proposal = await contract.proposals(proposalId);
  const voteEventFilter = contract.filters.VoteCast();

  const { startBlock, endBlock } = proposal;

  const startBlockNum = startBlock.toNumber();
  const endBlockNum = endBlock.toNumber();

  const voteEvents = await contract.queryFilter(
    voteEventFilter,
    startBlockNum,
    endBlockNum
  );
  const votes = await Promise.all(
    voteEvents.map(async (voteEvent: any) => {
      const { number, timestamp } = await voteEvent.getBlock();
      return { ...voteEvent, block: { number, timestamp } };
    })
  );
  console.log(
    `Retrieve vote events for proposal=${proposalId}: JSON=${JSON.stringify(
      votes
    )}`
  );
}
