CREATE TABLE `tags` (
	`tagId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`sync` text DEFAULT 'false' NOT NULL
);
