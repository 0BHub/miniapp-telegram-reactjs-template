import { Section, List } from '@telegram-apps/telegram-ui';
import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Page } from '@/components/Page.tsx';
import { getContract } from 'viem'
import { usePublicClient } from 'wagmi';
import { ABI, ADDRESS } from 'cs01-2024';

export const IndexPage: FC = () => {
  const publicClient = usePublicClient();
  const [counter, setCounter] = useState('0');
  console.log("Counter", counter);
  const contract = useMemo(() => {
    if (!publicClient) return undefined
    return getContract({
      address: ADDRESS,
      abi: ABI,
      client: { public: publicClient },
    })
  }, [publicClient])

  const fetchCounter = useCallback(async () => {
    const counter = await contract?.read.counter()
    return setCounter(counter?.toString() || '...')
  }, [contract])

  useEffect(() => {
    fetchCounter()
  }, [fetchCounter])

  return (
    <Page back={false}>
      <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <ConnectButton />
        </Section>
      </List>
    </Page>
  );
};
