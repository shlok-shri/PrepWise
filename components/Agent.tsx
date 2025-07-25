import { Span } from 'next/dist/trace';
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

const Agent = ({ userName } : AgentProps) => {

    const isSpeak = true;
    const callStatus = CallStatus.FINISHED; // This would typically come from props or state
    const messages = [
        'Whats your name?',
        'My name is John Doe'
    ]
    const lastMessage = messages[messages.length - 1];

  return (
    <>
        <div className='flex flex-col items-center justify-center gap-6'>
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image src='/ai-avatar.png' alt='Avatar' width={50} height={44} />
                        {isSpeak && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div> 

                <div className="card-border">
                    <div className="card-content">
                        <Image src='/user-avatar.png' alt='Avatar' width={440} height={440} className='rounded-full object-cover size-[120px]'/>
                        <h3>{userName}</h3>
                    </div>
                </div>       
            </div>

            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0 ', 'animate-fadeIn opacity-100')}>
                            {lastMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center mt-3">
                {callStatus !== 'ACTIVE' ? (
                    <button className='relative btn-call'>
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' & 'hidden')} />
                        
                        <span>
                            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
                        </span>
                    </button>
                ) : (
                    <button className='btn-disconnect'>
                        End
                    </button>
                )}
            </div>
        </div>
    </>
  )
}

export default Agent
