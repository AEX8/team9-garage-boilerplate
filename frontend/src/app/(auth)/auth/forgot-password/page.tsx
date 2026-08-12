'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { resetPassword } from '@/lib/firebase/auth'
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from '@/lib/validations/auth'

export default function ForgotPasswordPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  })

  /*
   * The boilerplate already provides resetPassword(), which calls Firebase's
   * sendPasswordResetEmail(). No new Firebase initialization is required.
   */
  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword(data.email)

      /*
       * Move to the confirmation screen after Firebase accepts the request.
       * The entered email is intentionally not placed in the URL.
       */
      router.push('/auth/reset-sent')
    } catch {
      /*
       * Keep the message general rather than exposing whether a particular
       * account exists.
       */
      toast.error('Unable to send the reset email. Please try again.')
    }
  }

  return (
    <section className="w-full rounded-[22px] border border-[#5BA4F5] bg-white px-7 py-9 shadow-[0_18px_45px_rgba(45,11,105,0.12)] sm:px-9">
      <header className="mb-7">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#2D0B69]">
          Forgot your password?
        </h2>

        <p className="mt-2 max-w-[300px] text-sm leading-5 text-[#7A8190]">
          No worries — pop in your email and we&apos;ll send you a reset link.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#2D0B69]">
            Email
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="h-12 w-full rounded-xl border border-[#E8DED3] bg-[#FFFCF8] px-4 text-sm text-[#2D0B69] outline-none transition placeholder:text-[#A9B0BF] focus:border-[#5BA4F5] focus:ring-2 focus:ring-[#5BA4F5]/20 aria-invalid:border-red-500"
            {...register('email')}
          />

          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center rounded-full border-b-[3px] border-[#F36F16] bg-[#FF8A36] px-5 text-sm font-bold text-white transition hover:bg-[#F97E26] focus:ring-4 focus:ring-[#FF8A36]/25 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <div className="mt-7 text-center">
        <Link
          href="/auth/signin"
          className="text-sm font-semibold text-[#8E4DE8] underline decoration-1 underline-offset-2 transition hover:text-[#2D0B69]"
        >
          Back to sign in
        </Link>
      </div>
    </section>
  )
}