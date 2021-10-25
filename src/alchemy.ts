import { fetchProposals } from "./proposals";

async function main() {
  await fetchProposals("0xc0da01a04c3f3e0be433606045bb7017a7323e38");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
