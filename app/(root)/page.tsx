import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.actions'

const page = async () => {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ])

  // let userInterviews = [];
  // if (user?.id) {
  //   userInterviews = await getInterviewsByUserId(user.id) ?? [];
  // }

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0;

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview Ready with AI powered Practise and FeedBack</h2>
          <p>Leverage the power of AI to enhance your interview preparation with personalized practice questions and real-time feedback.</p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>
          </Button>

        </div>

        <Image src='/robot.png' alt='Robot Image' width={300} height={300} className='max-sm:hidden' />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {hasPastInterviews && userInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId={interview.userId}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven't scheduled any interviews yet.</p>
          )}

          {/* {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))} */}

          {/* <p>You haven't scheduled any interviews yet.</p> */}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {hasUpcomingInterviews && latestInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interviewId={interview.id}
                userId={interview.userId}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no new Interviews available.</p>
          )}

          {/* <p>You haven't taken any interviews yet.</p> */}
        </div>
      </section>
    </>
  )
}

export default page
