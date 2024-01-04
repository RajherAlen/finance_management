import React from 'react';

import ProfilePersonaIcon from 'src/components/icons/profil-persona-icon.svg';

import Image from 'next/image';

const ProfilePersona = () => {
    return (
        <div className="flex flex-col items-center">
            <Image src={ProfilePersonaIcon} width={200} height={200} alt="Picture of the author" />
            <h1 className="mb-3 mt-5 text-xl font-bold">Profile Persona</h1>
            <p className="text-center text-sm font-normal text-muted">
                Provide your personal details, including your name and date of birth and consider personalizing your account with a profile
                image.
            </p>
        </div>
    );
};

export default ProfilePersona;
