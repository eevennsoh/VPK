"use client";

import React from "react";
import { token } from "@atlaskit/tokens";
import { IconButton } from "@atlaskit/button/new";
import Heading from "@atlaskit/heading";
import { Inline } from "@atlaskit/primitives";

import ArrowLeftIcon from "@atlaskit/icon/core/arrow-left";
import ArrowRightIcon from "@atlaskit/icon/core/arrow-right";

import SourceCard from "./source-card";
import { useCarousel } from "../hooks/use-carousel";
import type { SourceCard as SourceCardType } from "../data/ai-summary-data";

interface SourcesCarouselProps {
	sources: readonly SourceCardType[];
}

const CARD_WIDTH = 316;
const GAP = 16;

/**
 * Carousel component for displaying source cards with navigation
 */
export default function SourcesCarousel({ sources }: Readonly<SourcesCarouselProps>): React.ReactElement {
	const { carouselRef, scrollPrev, scrollNext } = useCarousel({ cardWidth: CARD_WIDTH, gap: GAP });

	return (
		<div>
			<style>{`
				.hide-scrollbar::-webkit-scrollbar {
					display: none;
				}
			`}</style>

			<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: token("space.100") }}>
				<div style={{ color: token("color.text.subtlest") }}>
					<Heading size="xxsmall">Sources</Heading>
				</div>
				<Inline space="space.050">
					<IconButton icon={ArrowLeftIcon} label="Previous source" appearance="subtle" onClick={scrollPrev} />
					<IconButton icon={ArrowRightIcon} label="Next source" appearance="subtle" onClick={scrollNext} />
				</Inline>
			</div>

			<div
				ref={carouselRef}
				style={{
					display: "flex",
					gap: token("space.200"),
					overflowX: "auto",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
				className="hide-scrollbar"
			>
				{sources.map((source) => (
					<SourceCard key={source.id} source={source} />
				))}
			</div>
		</div>
	);
}
