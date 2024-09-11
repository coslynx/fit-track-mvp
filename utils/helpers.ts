import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(3).max(50),
  target: z.string().min(1).max(100),
  deadline: z
    .date()
    .min(new Date())
    .refine((date) => date >= new Date(), {
      message: 'Deadline must be in the future',
    }),
  userId: z.number().int().positive(),
});

export const workoutSchema = z.object({
  name: z.string().min(3).max(50),
  duration: z.number().int().positive(),
  calories: z.number().int().positive(),
  date: z.date(),
  userId: z.number().int().positive(),
});

export const emailSchema = z.string().email();

export const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(3).max(50),
});

export function validateGoal(goal: any): z.infer<typeof goalSchema> {
  return goalSchema.parse(goal);
}

export function validateWorkout(workout: any): z.infer<typeof workoutSchema> {
  return workoutSchema.parse(workout);
}

export function validateEmail(email: any): z.infer<typeof emailSchema> {
  return emailSchema.parse(email);
}

export function validatePassword(password: any): z.infer<typeof passwordSchema> {
  return passwordSchema.parse(password);
}

export function validateLogin(data: any): z.infer<typeof loginSchema> {
  return loginSchema.parse(data);
}

export function validateRegister(data: any): z.infer<typeof registerSchema> {
  return registerSchema.parse(data);
}