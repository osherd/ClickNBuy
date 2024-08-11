ALTER TABLE "cart_line_items" ADD COLUMN "price" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_line_items" DROP COLUMN IF EXISTS "amount";