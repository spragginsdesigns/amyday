import React from "react";

export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-dark-bg">
			<div className="text-center">
				<div className="mb-4">
					<div className="w-16 h-16 mx-auto border-t-4 border-b-4 border-blush rounded-full animate-spin"></div>
				</div>
				<h2 className="text-xl text-blush font-serif">
					Loading Amy&apos;s special place...
				</h2>
			</div>
		</div>
	);
}
