CREATE TABLE `prompts` (
	`promptId` text PRIMARY KEY NOT NULL,
	`promptTitle` text NOT NULL,
	`promptText` text NOT NULL,
	`tag` text NOT NULL,
	`sync` text DEFAULT 'false' NOT NULL
);
