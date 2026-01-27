"use client";

import { useState, useId } from "react";
import { IconButton } from "@atlaskit/button/new";
import MenuIcon from "@atlaskit/icon/core/menu";
import ChevronDownIcon from "@atlaskit/icon/core/chevron-down";
import AddIcon from "@atlaskit/icon/core/add";
import EditIcon from "@atlaskit/icon/core/edit";
import SmartLinkEmbedIcon from "@atlaskit/icon/core/smart-link-embed";
import ShowMoreHorizontalIcon from "@atlaskit/icon/core/show-more-horizontal";
import CrossIcon from "@atlaskit/icon/core/cross";
import DeleteIcon from "@atlaskit/icon/core/delete";
import AppIcon from "@atlaskit/icon/core/app";
import FeedbackIcon from "@atlaskit/icon/core/feedback";
import BugIcon from "@atlaskit/icon/core/bug";
import QuestionCircleIcon from "@atlaskit/icon/core/question-circle";
import SkillIcon from "@atlaskit/icon-lab/core/skill";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from "@atlaskit/dropdown-menu";
import { Inline, Text, Box } from "@atlaskit/primitives";
import Image from "next/image";

interface ChatHeaderProps {
	onClose?: () => void;
}

export default function ChatHeader({ onClose }: ChatHeaderProps) {
	const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
	const dropdownId = useId();

	// No-op handlers for visual-only buttons
	const noop = () => {};

	return (
		<Box paddingBlock="space.150" paddingInline="space.150">
			<Inline spread="space-between" alignBlock="center">
				{/* Left side: Menu icon and Title */}
				<Inline space="space.050" alignBlock="center">
					<IconButton icon={MenuIcon} label="Menu" appearance="subtle" spacing="default" onClick={noop} />
					<Inline space="space.100" alignBlock="center">
						<Image src="/Rovo.svg" alt="Rovo" width={20} height={20} style={{ objectFit: "contain" }} />
						<Inline space="space.050" alignBlock="center">
							<Text weight="semibold" color="color.text">
								Rovo
							</Text>
							<ChevronDownIcon label="Expand menu" size="small" />
						</Inline>
					</Inline>
				</Inline>

				{/* Right side: Chat actions */}
				<Inline space="space.050" alignBlock="center">
					<IconButton icon={EditIcon} label="New chat" appearance="subtle" spacing="default" onClick={noop} />
					<IconButton icon={SmartLinkEmbedIcon} label="Switch view" appearance="subtle" spacing="default" onClick={noop} />
					<div
						id={dropdownId}
						style={{
							position: "relative",
							overflow: "visible",
						}}
					>
						<DropdownMenu
							placement="bottom-end"
							shouldRenderToParent
							isOpen={isMoreMenuOpen}
							onOpenChange={({ isOpen }) => setIsMoreMenuOpen(isOpen)}
							trigger={({ triggerRef, ...props }) => (
								<IconButton ref={triggerRef} {...props} icon={ShowMoreHorizontalIcon} label="More" appearance={isMoreMenuOpen ? "default" : "subtle"} isSelected={isMoreMenuOpen} spacing="default" />
							)}
						>
							<DropdownItemGroup>
								<DropdownItem elemBefore={<EditIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Rename
								</DropdownItem>
								<DropdownItem elemBefore={<DeleteIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Delete
								</DropdownItem>
							</DropdownItemGroup>
							<DropdownItemGroup hasSeparator>
								<DropdownItem elemBefore={<AppIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Chrome extension
								</DropdownItem>
							</DropdownItemGroup>
							<DropdownItemGroup hasSeparator>
								<DropdownItem elemBefore={<FeedbackIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Feedback
								</DropdownItem>
								<DropdownItem elemBefore={<BugIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Debug
								</DropdownItem>
								<DropdownItem elemBefore={<QuestionCircleIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Get help
								</DropdownItem>
							</DropdownItemGroup>
							<DropdownItemGroup hasSeparator>
								<DropdownItem elemBefore={<AddIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									Create skill
								</DropdownItem>
								<DropdownItem elemBefore={<SkillIcon label="" color="currentColor" />} onClick={() => setIsMoreMenuOpen(false)}>
									View all skills
								</DropdownItem>
							</DropdownItemGroup>
						</DropdownMenu>
						<style>{`
						#${dropdownId} [data-ds--level="1"] {
							position: absolute !important;
							right: 0 !important;
							top: calc(100% + 4px) !important;
							bottom: auto !important;
							min-width: max-content;
							margin: 0 !important;
							transform: none !important;
						}
					`}</style>
					</div>
					<IconButton icon={CrossIcon} label="Close" appearance="subtle" spacing="default" onClick={onClose ?? noop} />
				</Inline>
			</Inline>
		</Box>
	);
}
