import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team 09: IBM AI-Powered Consulting Simulation',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6"
      style={{
        background:
          'linear-gradient(180deg, #FFF4C7 0%, #FFF9EA 43%, #F7F7FA 65%, #E5EBFF 100%)',
      }}
    >
      {/*
       * The outer container is no longer limited to the card's width.
       * This gives the long project title enough horizontal room.
       */}
      <div className="flex w-full flex-col items-center">
        {/*
         * `whitespace-nowrap` keeps the complete project title on one line.
         *
         * The clamp() font size automatically becomes smaller on narrow
         * screens and grows to a maximum of 3.25rem on large screens.
         */}
        <h1 className="mb-8 max-w-[96vw] whitespace-nowrap text-center text-[clamp(1rem,3.2vw,3.25rem)] leading-tight font-extrabold tracking-tight text-[#2D0B69] sm:mb-10">
          Team 09: IBM AI-Powered Consulting Simulation
        </h1>

        {/*
         * Only the authentication card is constrained to 390px.
         * This prevents the title from wrapping at the card boundary.
         */}
        <div className="w-full max-w-[390px]">{children}</div>
      </div>
    </main>
  )
}
