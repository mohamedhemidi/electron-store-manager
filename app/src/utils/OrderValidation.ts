import { IOrder } from '../pages/ordersList/OrdersList';

export const ValidateOrder = async (
  data: Omit<IOrder, 'id' | 'createdAt'>
): Promise<{ valid: boolean; errorMessages: string[] }> => {
  let valid = true;
  const errorMessages: string[] = [];
  if (typeof data.price != 'number') {
    valid = false;
    errorMessages.push('Price must be a number');
  }
  if (typeof data.weight != 'number') {
    valid = false;
    errorMessages.push('Weight must be a number');
  }

  return { valid, errorMessages };
};
