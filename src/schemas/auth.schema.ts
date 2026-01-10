import { z } from "zod";

// SIGNUP

export const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(60),
  email: z.email("Please enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type TSignUpFormValues = z.infer<typeof signUpSchema>;

export const signupDefaultValues: TSignUpFormValues = {
  fullName: "",
  email: "",
  password: "",
};

export const signupSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.email(),
  }),
});

export type TSignupSuccess = z.infer<typeof signupSuccessSchema>;

export const signupErrorSchema = z.object({
  success: z.literal(false),
  error: z.string().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string().optional(),
      }),
    )
    .optional(),
});

export type TSignupError = z.infer<typeof signupErrorSchema>;

//SIGNIN

export const signInSchema = z.object({
  email: z.email("Please enter a valid email."),

  password: z
    .string("Incorrect password.")
    .min(6, "Password must be at least 6 characters."),
});

export type TSignInFormValues = z.infer<typeof signInSchema>;

export const signinDefaultValues: TSignInFormValues = {
  email: "",
  password: "",
};

export const loginSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: z.object({
    user: z.object({
      fullName: z.string(),
      email: z.email(),
      role: z.string(),
      isActive: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      lastLoginAt: z.string().nullable().optional(),
      lastLoginIP: z.string().nullable().optional(),
      id: z.string(),
    }),
    accessToken: z.string().min(1),
  }),
});

export type TLoginSuccess = z.infer<typeof loginSuccessSchema>;

export const loginErrorSchema = z.object({
  success: z.literal(false),
  error: z.string().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
        code: z.string().optional(),
      }),
    )
    .optional(),
});

export type TLoginError = z.infer<typeof loginErrorSchema>;

// LOGOUT

export const logoutSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export type TLogoutSuccess = z.infer<typeof logoutSuccessSchema>;

export const logoutErrorSchema = z.object({
  success: z.literal(false),
  error: z.string().optional(),
  message: z.string().optional(),
  code: z.string().optional(),
});

export type TLogoutError = z.infer<typeof logoutErrorSchema>;

// PROFILE

export const profileSuccessSchema = z.object({
  success: z.literal(true),
  data: z.object({
    fullName: z.string(),
    email: z.email(),
    role: z.string(),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    lastLoginAt: z.string().nullable().optional(),
    lastLoginIP: z.string().nullable().optional(),
    id: z.string(),
  }),
});

export type TProfileSuccess = z.infer<typeof profileSuccessSchema>;

export const profileErrorSchema = z.object({
  success: z.literal(false),
  error: z.literal("Unauthorized").optional(),
  message: z.string().optional(),
  code: z.literal("TOKEN_MISSING").optional(),
});

export type TProfileError = z.infer<typeof profileErrorSchema>;
export type TProfileUser = z.infer<typeof profileSuccessSchema>["data"];
