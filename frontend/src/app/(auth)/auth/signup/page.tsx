'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignUpPage() {
  const router = useRouter()

  /*
   * The approved design uses email/password registration only.
   * Google sign-up is intentionally not displayed on this page.
   */
  const { user, loading, signUpWithEmail } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  /*
   * Prevent an already authenticated user from remaining on the sign-up page.
   */
  useEffect(() => {
    if (!loading && !isSubmitting && user) {
      router.replace('/team')
    }
  }, [loading, isSubmitting, user, router])

  if (loading) {
    return <FullPageSpinner />
  }

  /*
   * Preserve the existing Firebase registration flow.
   *
   * confirmPassword is validated in signupSchema, but it is deliberately not
   * passed to Firebase. Firebase needs only email, password and display name.
   */
  const onSubmit = async (data: SignupInput) => {
    try {
      await signUpWithEmail(data.email, data.password, data.displayName)

      /*
       * The existing boilerplate sends a verification email before returning
       * the user to the sign-in screen.
       */
      router.push('/auth/signin?verification=sent')
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('An account with this email already exists')
      } else {
        toast.error('Failed to create account. Please try again.')
      }
    }
  }

  return (
    <section className="w-full rounded-[22px] border border-[#9B63F3] bg-white px-7 py-8 shadow-[0_18px_45px_rgba(45,11,105,0.12)] sm:px-9">
      {/* Heading from the approved sign-up mockup. */}
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#2D0B69]">
          Join the crew!
        </h2>

        <p className="mt-2 text-sm text-[#7A8190]">
          Use your email to get started.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full-name field */}
        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-sm font-bold text-[#2D0B69]"
          >
            Full name
          </label>

          <input
            id="displayName"
            type="text"
            autoComplete="name"
            placeholder="Alex Moreau"
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? 'display-name-error' : undefined}
            className="h-11 w-full rounded-full border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('displayName')}
          />

          {errors.displayName && (
            <p
              id="display-name-error"
              className="mt-1 text-xs font-medium text-red-600"
              role="alert"
            >
              {errors.displayName.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-[#2D0B69]">
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="h-11 w-full rounded-full border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('email')}
          />

          {errors.email && (
            <p id="email-error" className="mt-1 text-xs font-medium text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-bold text-[#2D0B69]"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : 'password-help'}
            className="h-11 w-full rounded-full border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('password')}
          />

          {errors.password ? (
            <p
              id="password-error"
              className="mt-1 text-xs font-medium text-red-600"
              role="alert"
            >
              {errors.password.message}
            </p>
          ) : (
            <p id="password-help" className="mt-1 text-xs text-[#7A8190]">
              At least 8 characters, one uppercase letter and one number.
            </p>
          )}
        </div>

        {/* Confirmation field retained for safer account creation. */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-bold text-[#2D0B69]"
          >
            Confirm password
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? 'confirm-password-error' : undefined
            }
            className="h-11 w-full rounded-full border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('confirmPassword')}
          />

          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              className="mt-1 text-xs font-medium text-red-600"
              role="alert"
            >
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Existing disabled/loading behaviour is preserved. */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full border-b-[3px] border-[#F36F16] bg-[#FF8A36] px-5 text-sm font-bold text-white transition hover:bg-[#F97E26] focus:ring-4 focus:ring-[#FF8A36]/25 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[#7A8190]">
        Already have an account?{' '}
        <Link
          href="/auth/signin"
          className="font-bold text-[#2D0B69] underline decoration-1 underline-offset-2 transition hover:text-[#8E4DE8]"
        >
          Sign in
        </Link>
      </p>
    </section>
  )
}