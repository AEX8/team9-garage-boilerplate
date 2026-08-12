'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { FullPageSpinner } from '@/components/shared/LoadingSpinner'

export default function SignInPage() {
  const router = useRouter()

  /*
   * Google authentication is intentionally not displayed because it does not
   * appear in the approved authentication mockup.
   */
  const { user, loading, signInWithEmail } = useAuth()

  const {
    register,
    handleSubmit,

    /*
     * setError lets Firebase authentication failures appear beneath the
     * password field instead of inside a popup notification.
     */
    setError,

    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  /*
   * Keep the boilerplate's existing behaviour for already signed-in users.
   */
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [loading, user, router])

  /*
   * The sign-up flow redirects here after sending a verification email.
   * This will be a popup because it is a page-level success notification,
   * not an invalid-password error.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (params.get('verification') === 'sent') {
      toast.success('Verification email sent. Verify your email, then sign in.')
    }
  }, [])

  if (loading) {
    return <FullPageSpinner />
  }

  const onSubmit = async (data: LoginInput) => {
    try {
      /*
       * Preserve the original Firebase email/password authentication,
       * verification check and session-cookie behaviour.
       */
      await signInWithEmail(data.email, data.password)

      toast.success('Signed in successfully')

      
      router.replace('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('email-not-verified')) {
        /*
         * A page-level notification for unverified account.
         */
        toast.error('Please verify your email before signing in.')
        return
      }

      /*
       * Any invalid-credential error is attached to the Password field.
       */
      setError(
        'password',
        {
          type: 'server',
          message: 'Invalid email or password',
        },
        {
          shouldFocus: true,
        }
      )
    }
  }

  return (
    <section className="w-full rounded-[22px] border border-[#F6B934] bg-white px-7 py-9 shadow-[0_18px_45px_rgba(45,11,105,0.12)] sm:px-9">
      {/* Card title and supporting text from the approved mockup. */}
      <header className="mb-7">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#2D0B69]">
          Welcome back!
        </h2>

        <p className="mt-2 text-sm text-[#7A8190]">
          Use your email to hop back in.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {/* Email input and its inline validation error. */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#2D0B69]">
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="username"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="h-12 w-full rounded-xl border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('email')}
          />

          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-xs font-medium text-red-600"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password label and password-reset link. */}
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="password" className="block text-sm font-bold text-[#2D0B69]">
              Password
            </label>

            <Link
              href="/auth/forgot-password"
              className="text-xs font-semibold text-[#8E4DE8] underline decoration-1 underline-offset-2 transition hover:text-[#2D0B69]"
            >
              Forgot password?
            </Link>
          </div>

          {/*
           * Both client-side validation and Firebase invalid-credential errors
           * are displayed beneath this input through errors.password.
           */}
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="h-12 w-full rounded-xl border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#8E4DE8] focus:ring-2 focus:ring-[#8E4DE8]/20 aria-invalid:border-red-500 aria-invalid:ring-red-500/15"
            {...register('password')}
          />

          {/*
           * This is where "Invalid email or password" appears.
           * role="alert" announces it to assistive technology.
           */}
          {errors.password && (
            <p
              id="password-error"
              className="mt-1.5 text-xs font-medium text-red-600"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Email/password submit button with loading and disabled states. */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full border-b-[3px] border-[#F36F16] bg-[#FF8A36] px-5 text-sm font-bold text-white transition hover:bg-[#F97E26] focus:ring-4 focus:ring-[#FF8A36]/25 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      {/* Link to the sign-up screen. */}
      <p className="mt-7 text-center text-sm text-[#7A8190]">
        New here?{' '}
        <Link
          href="/auth/signup"
          className="font-bold text-[#2D0B69] underline decoration-1 underline-offset-2 transition hover:text-[#8E4DE8]"
        >
          Create account
        </Link>
      </p>
    </section>
  )
}