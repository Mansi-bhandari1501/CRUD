import { z } from 'zod';

export const restaurantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tag: z.string().min(1, 'tag is required'),
  amount: z.string().min(1,'amount must be there'),
  price: z.string().min(1, 'price is required') ,
  category: z.array(z.string()).optional(),
  // cuisine: z.array(z.string()).optional(),
  desc: z.string().min(1, 'Description is required'),
  image: z.any().optional(),
});
