import React from 'react';

import Button, { buttonVariants } from 'src/components/button/Button';
import GobletIcon from 'src/components/icons/goblet.svg';

import Image from 'next/image';
import Link from 'next/link'

const OnboardingSuccess = () => {

    return (
        <div className="flex flex-col items-center">
            <Image src={GobletIcon} width={200} height={200} alt="Picture of the author" />
            <p className="mb-3 text-3xl font-bold">You are all set!</p>
            <p className="mb-5 text-sm text-muted">We have taken your data and personalized financial dashboard for you.</p>

            <Link href="/" className={buttonVariants({ size: 'lg' })}>Go to Dashboard</Link>
        </div>
    );
};

export default OnboardingSuccess;
