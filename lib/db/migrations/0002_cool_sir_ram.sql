ALTER TABLE "meals" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "meals" DROP CONSTRAINT "meals_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "meals" ADD CONSTRAINT "meals_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;