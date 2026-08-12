import Link from 'next/link'

export default function ResetSentPage() {
  return (
    <section className="w-full rounded-[22px] bg-white px-7 py-9 text-center shadow-[0_18px_45px_rgba(45,11,105,0.12)] sm:px-9 sm:py-10">
      {/*
       * Decorative confirmation icon from the approved mockup.
       * The SVG is hidden from screen readers because the heading communicates
       * the same confirmation meaning in text.
       */}
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF9A37] bg-[#FFF4C7]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-[#F36F16]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </div>

      <h2 className="mt-7 text-3xl font-extrabold tracking-tight text-[#2D0B69]">
        Check your inbox
      </h2>

      <p className="mx-auto mt-3 max-w-[300px] text-sm leading-5 text-[#7A8190]">
        We&apos;ve sent a reset link to your email. It may take a minute to arrive.
      </p>

      <Link
        href="/auth/signin"
        className="mt-7 flex h-12 w-full items-center justify-center rounded-full border-b-[3px] border-[#F36F16] bg-[#FF8A36] px-5 text-sm font-bold text-white transition hover:bg-[#F97E26] focus:ring-4 focus:ring-[#FF8A36]/25 focus:outline-none"
      >
        Back to sign in
      </Link>
    </section>
  )
}