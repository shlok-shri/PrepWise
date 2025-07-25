import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { getRandomInterviewCover } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt} : InterviewCardProps) => {

  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM DD, YYYY');

  return (
    <div className='card-border w-[30%] max-sm:w-full min-h-[200px]'>
        <div className='card-interview'>
          <div>
            <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600 '>
              <p className='badge-text'>{normalizedType}</p>
            </div>

            <Image src={getRandomInterviewCover()} alt='cover image' height={70} width={70} className='rounded-full object-fit size-[90px]' />

            <h3 className='mt-5 capitalize'>
              {role} Interview
            </h3>

            <div className='flex flex-row gap-5 mt-3'>
              <div className='flex flex-row gap-2'>
                <Image src='/calendar.svg' alt='calendar icon' width={16} height={16} />
                <p className='text-sm text-muted-foreground'>{formattedDate}</p>
              </div>

              <div className='flex flex-row gap-2 items-center'>
                <Image src='/star.svg' alt='star icon' width={16} height={16} />
                <p>{feedback?.totalScore || '---'}/100</p>
              </div>
            </div>

            <p className='line-clamp-2 mt-5'>
              {feedback?.finalAssessment || `You haven't taken any Interview yet, Take it now! `}
            </p>
          </div>

          <div className='flex flex-row justify-between '>
            <DisplayTechIcons techstack={techstack} />

            <Button className='btn-primary'>
              <Link href={feedback 
                ? `/interview/${interviewId}/feedback` 
                : `/interview/${interviewId}`}
              >
                {feedback ? 'View Feedback' : 'Take Interview'}
              </Link>
            </Button>
          </div>
        </div>
    </div>
  )
}

export default InterviewCard
