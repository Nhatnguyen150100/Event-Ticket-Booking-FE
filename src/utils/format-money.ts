export function formatCurrency(amount: number): string {
  const roundedAmount = amount.toFixed(0);
  
  const formattedAmount = roundedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${formattedAmount} VNĐ`;
}