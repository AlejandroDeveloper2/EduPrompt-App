PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_resources` (
	`resourceId` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`format` text NOT NULL,
	`formatKey` text NOT NULL,
	`groupTag` text NOT NULL,
	`creationDate` text DEFAULT '1767367048610',
	`sync` text DEFAULT 'false' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_resources`("resourceId", "title", "content", "format", "formatKey", "groupTag", "creationDate", "sync") SELECT "resourceId", "title", "content", "format", "formatKey", "groupTag", "creationDate", "sync" FROM `resources`;--> statement-breakpoint
DROP TABLE `resources`;--> statement-breakpoint
ALTER TABLE `__new_resources` RENAME TO `resources`;--> statement-breakpoint
PRAGMA foreign_keys=ON;