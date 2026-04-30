import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
})

export type FormData = z.infer<typeof formSchema>
