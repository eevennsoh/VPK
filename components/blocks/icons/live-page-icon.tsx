"use client";

import { token } from "@atlaskit/tokens";

interface LivePageIconProps {
	size?: number;
	color?: string;
}

export default function LivePageIcon({ size = 26, color }: LivePageIconProps) {
	const fillColor = color || token("color.icon");

	return (
		<svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" clipRule="evenodd" d="M24.375 5.6875H1.625V3.25H24.375V5.6875ZM9.75 13.8125H1.625V11.375H9.75V13.8125ZM9.75 22.75H1.625V20.3125H9.75V22.75Z" fill={fillColor} />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.1695 11.7319C14.5075 11.394 15.0117 11.2847 15.4592 11.4526L25.2092 15.1088C25.7087 15.2962 26.0284 15.7866 25.998 16.3193C25.9677 16.852 25.5944 17.303 25.0768 17.4324L20.9113 18.4738L19.8699 22.6393C19.7405 23.1569 19.2895 23.5302 18.7568 23.5605C18.2241 23.5909 17.7337 23.2712 17.5463 22.7717L13.8901 13.0216C13.7223 12.5741 13.8316 12.0699 14.1695 11.7319Z"
				fill={fillColor}
			/>
		</svg>
	);
}
