"use client";

import React, { useState, useEffect } from "react";
import { token } from "@atlaskit/tokens";

function LoadingWidget({ widgetType }: { widgetType?: string }) {
	const [step, setStep] = useState(0);

	const hotelMessages = ["Accessing calendar...", "Confirming travel policy...", "Searching hotels..."];

	useEffect(() => {
		if (widgetType === "hotels") {
			const interval = setInterval(() => {
				setStep((prev) => (prev + 1) % hotelMessages.length);
			}, 1200);
			return () => clearInterval(interval);
		}
	}, [widgetType]);

	const getMessage = () => {
		if (widgetType === "work-items") return "Loading work items...";
		return "Loading widget...";
	};

	return (
		<div
			style={{
				padding: token("space.200"),
				backgroundColor: token("color.background.neutral.subtle"),
				borderRadius: token("radius.large"),
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				color: token("color.text.subtlest"),
				font: token("font.body"),
				marginLeft: "12px",
				marginRight: "12px",
			}}
		>
			{getMessage()}
		</div>
	);
}

export default LoadingWidget;
