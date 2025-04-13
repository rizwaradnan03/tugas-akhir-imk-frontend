export const formatPrice = ({price}: {price: number}) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0, // tanpa desimal
    }).format(price);
  };