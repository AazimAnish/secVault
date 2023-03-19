import { create } from "ipfs-core";

export const deleteFile = async (hash) => {
  const ipfs = await create();
  try {
    await ipfs.files.rm(`/ipfs/${hash}`);
    console.log(`File ${hash} deleted from IPFS`);
  } catch (error) {
    console.error(`Error deleting file ${hash} from IPFS:`, error);
  }
};
