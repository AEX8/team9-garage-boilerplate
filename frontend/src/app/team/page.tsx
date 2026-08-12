import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/actions/auth.actions'
import SignOutButton from './SignOutButton'

const teamMembers = [
  {
    name: 'Gayath Wethmin Kaluwahewa',
    role: 'Project Manager',
    image: '/team/Gayath.jpg',
    blurb:
      'Organises the team, coordinates tasks, and keeps the project moving toward completion.',
  },
  {
    name: 'Fatima Hubali',
    role: 'Business Analyst',
    image: '/team/Fatima.JPG',
    blurb:
      'Helps define project requirements and makes sure the team understands what needs to be built.',
  },
  {
    name: 'Amritha Selvaganapathi',
    role: 'UX Designer',
    image: '/team/Amritha.jpg',
    blurb:
      'Designs the user experience and creates clear, user-friendly layouts for the project.',
  },
  {
    name: 'Kashaf Fatima',
    role: 'Developer',
    image: '/team/Kashaf.PNG',
    blurb:
      'Builds and supports application features while helping turn the team’s designs into working code.',
  },
  {
    name: 'Ibrahim Allouche',
    role: 'Developer',
    image: '/team/Ibrahim.PNG',
    blurb:
      'Develops application features and works on authentication, protected pages, and backend integration.',
  },
]

export default async function TeamPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-indigo-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-start justify-between gap-6">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700">
              Team 9 Garage
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-indigo-950 sm:text-5xl">
              Meet the Team
            </h1>

            <p className="mt-4 max-w-2xl text-zinc-600">
              Meet the people working together to design, build, and deliver the Team 9 Garage project.
            </p>
          </div>

          <SignOutButton />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-3xl bg-indigo-950 shadow-xl"
            >
              <div className="relative h-72 w-full bg-zinc-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>

              <div className="flex min-h-64 flex-col p-5 text-white">
                <h2 className="text-lg font-bold leading-tight">
                  {member.name}
                </h2>

                <span className="mt-3 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {member.role}
                </span>

                <p className="mt-4 text-sm leading-6 text-indigo-100">
                  {member.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}