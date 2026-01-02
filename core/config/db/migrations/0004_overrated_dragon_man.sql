CREATE TABLE `resources` (
	`resourceId` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`format` text NOT NULL,
	`formatKey` text NOT NULL,
	`groupTag` text NOT NULL,
	`creationDate` text DEFAULT '1767366128070'
);
