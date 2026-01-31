export interface AvatarData {
	src: string;
	name: string;
}

export const AVATARS: readonly AvatarData[] = [
	{ src: "/people/Avatar-1.png", name: "User 1" },
	{ src: "/people/Avatar-2.png", name: "User 2" },
	{ src: "/people/Avatar-3.png", name: "User 3" },
	{ src: "/people/Avatar-4.png", name: "User 4" },
	{ src: "/people/Avatar-5.png", name: "User 5" },
	{ src: "/people/Avatar-6.png", name: "User 6" },
	{ src: "/people/Avatar-7.png", name: "User 7" },
] as const;
