"use client";

import { token } from "@atlaskit/tokens";
import TextField from "@atlaskit/textfield";
import SearchIcon from "@atlaskit/icon/core/search";

interface ContentSearchFieldProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function ContentSearchField({
	value,
	onChange,
	placeholder = "Search by title",
}: Readonly<ContentSearchFieldProps>) {
	return (
		<div
			style={{
				padding: `${token("space.100")} ${token("space.150")} ${token("space.100")} 0`,
			}}
		>
			<style>{`
				.sidebar-search-field input {
					font: ${token("font.body")} !important;
					height: 32px !important;
					box-sizing: border-box !important;
				}
				.sidebar-search-field > div {
					height: 32px !important;
				}
			`}</style>
			<div className="sidebar-search-field">
				<TextField
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange((e.target as HTMLInputElement).value)}
					elemBeforeInput={
						<div
							style={{
								display: "flex",
								alignItems: "center",
								paddingLeft: token("space.100"),
							}}
						>
							<SearchIcon label="Search" color={token("color.icon.subtle")} />
						</div>
					}
				/>
			</div>
		</div>
	);
}
