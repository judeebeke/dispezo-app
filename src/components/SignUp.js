import React from 'react';
import Button from './UI/Button';

const SignUp = () => {
    const btnStyles = 'bg-main text-white'
  return (
    <section className='flex flex-col items-center mt-12 gap-y-10'>
        <header className="mb-44">
            <h2 className='text-2xl text-main font-semibold'>Dispezo Gen-Z</h2>
        </header>
        <div className='flex justify-between gap-x-4'>
            <Button text="Create Room" styles={btnStyles} />
            <Button text="Join Room" styles={btnStyles} />
        </div>
    </section>
  )
}

export default SignUp;
