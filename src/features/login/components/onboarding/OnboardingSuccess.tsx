import Image from "next/image";
import React from "react";
import Button from "src/components/button/Button";
import GobletIcon from "src/components/icons/goblet.svg";
import { useRouter } from "next/navigation";

const OnboardingSuccess = () => {
	const router = useRouter()

	return (
		<div className="flex flex-col items-center">
			<Image
				src={GobletIcon}
				width={200}
				height={200}
				alt="Picture of the author"
			/>
            <p className="text-3xl font-bold mb-3">You are all set!</p>
            <p className="text-sm text-muted mb-5">We have taken your data and personalized financial dashboard for you.</p>
        
			
            <Button onClick={() => router.push("/")}>
                Go to Dashboard
            </Button>
        </div>
	);
};

export default OnboardingSuccess;
