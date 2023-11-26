import React from "react";
import Image from "next/image";

import ProfilePersonaIcon from "src/components/icons/profil-persona-icon.svg";

const ProfilePersona = () => {
	return (
		<div className="flex flex-col items-center">
			<Image
				src={ProfilePersonaIcon}
				width={200}
				height={200}
				alt="Picture of the author"
			/>
			<h1 className="text-xl font-bold mt-5 mb-3">Profile Persona</h1>
			<p className="text-sm text-[#A3AEB4] font-normal text-center">
				Provide your personal details, including your name and date of
				birth and consider personalizing your account with a profile
				image.
			</p>
		</div>
	);
};

export default ProfilePersona;
