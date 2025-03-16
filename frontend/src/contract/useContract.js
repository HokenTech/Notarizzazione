import { useState, useEffect } from 'react';
import { Contract } from '@wharfkit/contract';
import { CONTRACT_CONFIG } from './config';
import { useSession } from '../session';

export function useContract() {
  const { session } = useSession();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (!session) return;

    try {
      const contractInstance = new Contract({
        abi: CONTRACT_CONFIG.abi,
        account: CONTRACT_CONFIG.account,
        client: session.client
      });
      setContract(contractInstance);
    } catch (error) {
      console.error('Contract initialization error:', error);
    }
  }, [session]);

  return contract;
}