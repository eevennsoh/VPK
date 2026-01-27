"use client";

import React from "react";
import { Inline } from "@atlaskit/primitives/compiled";
import { token } from "@atlaskit/tokens";
import Button from "@atlaskit/button/new";
import { IconButton } from "@atlaskit/button/new";
import TextField from "@atlaskit/textfield";
import Avatar from "@atlaskit/avatar";
import SearchIcon from "@atlaskit/icon/core/search";
import CustomizeIcon from "@atlaskit/icon/core/customize";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";

interface AvatarData {
	src: string;
	name: string;
}

interface BoardToolbarProps {
	avatars: AvatarData[];
	isMounted: boolean;
}

const BoardToolbar: React.FC<BoardToolbarProps> = ({ avatars, isMounted }) => {
	return (
		<div
			style={{
				paddingTop: token("space.150"),
				paddingBottom: token("space.250"),
				paddingInline: token("space.300"),
			}}
		>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Inline space="space.200" alignBlock="center">
					<div
						className="search-field-wrapper"
						style={{
							width: "184px",
						}}
					>
						<style
							dangerouslySetInnerHTML={{
								__html: `
                .search-field-wrapper input::placeholder {
                  font-size: 14px;
                  font-weight: 400;
                }
                .search-field-wrapper input {
                  height: 28px;
                  box-sizing: border-box;
                }
              `,
							}}
						/>
						<TextField
							placeholder="Search board"
							isCompact
							elemBeforeInput={
								<div
									style={{
										paddingLeft: token("space.100"),
										marginRight: token("space.100"),
										width: "16px",
										height: "16px",
									}}
								>
									<SearchIcon label="Search" />
								</div>
							}
						/>
					</div>
					{isMounted && (
						<div style={{ display: "flex", marginLeft: token("space.negative.050") }}>
							{avatars.slice(0, 4).map((avatar, index) => (
								<div key={`avatar-${index}`} style={{ marginLeft: token("space.negative.050") }}>
									<Avatar size="small" src={avatar.src} name={avatar.name} />
								</div>
							))}
							{avatars.length > 4 && (
								<div style={{ marginLeft: token("space.negative.050") }}>
									<Avatar size="small" name={`+${avatars.length - 4}`} />
								</div>
							)}
						</div>
					)}
					<Button
						appearance="default"
						iconAfter={(iconProps) => <ChevronDownIcon {...iconProps} size="small" />}
					>
						Filter
					</Button>
				</Inline>

				<Inline space="space.100" alignBlock="center">
					<Button appearance="default" isSelected>
						Group: Status
					</Button>
					<IconButton icon={CustomizeIcon} label="Customize" />
				</Inline>
			</div>
		</div>
	);
};

export default BoardToolbar;
