// Create separate enum of all supported blockchains
enum Blockchain {
  Osmosis = 'Osmosis',
  Ethereum = 'Ethereum',
  Arbitrum = 'Arbitrum',
  Zilliqa = 'Zilliqa',
  Neo = 'Neo'
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain | string; // Add the blockchain field (It was used in the code, but was not presented in interface)
}

// Remove FormattedWalletBalance

interface Props extends BoxProps {}

// Create list of all blockchains with priorities
const blockchainPriority: Record<Blockchain, number> = {
  [Blockchain.Osmosis]: 100,
  [Blockchain.Ethereum]: 50,
  [Blockchain.Arbitrum]: 30,
  [Blockchain.Zilliqa]: 20,
  [Blockchain.Neo]: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  // Remove 'children' prop because it was not used
  // Replace the '...rest' props with specific props, because it will make code more readable and understandable
  const { className, style } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  // Get priority from list Instead of switch-case. It will be easily to expand the list
  const getPriority = (blockchain: Blockchain | string): number => { // Allow string as param is case if unsupported blockchain name was passed
    return blockchainPriority[blockchain as Blockchain] || -99;
  };

  // It will be better to not use the useMemo if balances will be updated frequently
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((balanceA: WalletBalance, balanceB: WalletBalance) => { // lhs and rhs are bad names, better to use names that will improve code clarity
        const priorityA = getPriority(balanceA.blockchain);
        const priorityB = getPriority(balanceB.blockchain);
        return priorityB - priorityA;
      });
  }, [balances]); // Remove prices dependency

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const formattedAmount = balance.amount.toFixed(2); // Better to get the formatted amount here instead of using .map() twice
    const usdValue = prices[balance.currency] * balance.amount;

    // Remove the className prop because we do not have any classes variable in code
    return (
      <WalletRow
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  // Passing each prop directly instead of {...rest} will increase the code readability
  return <div
      className={className}
      style={style}
  >
    {rows}
  </div>;
};
