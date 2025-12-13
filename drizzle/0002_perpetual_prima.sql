PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`tagId` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`sync` text DEFAULT 'false' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`("tagId", "name", "type", "sync") SELECT "tagId", "name", "type", "sync" FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;