

export interface IWeb3Store {
  chainId: string;
}

export class Web3Store implements IWeb3Store {
  chainId = '';


}

export const web3Store = new Web3Store()


