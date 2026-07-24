-- DropIndex
DROP INDEX "public"."click_event_linkId_idx";

-- DropIndex
DROP INDEX "public"."click_event_profileId_idx";

-- CreateIndex
CREATE INDEX "click_event_linkId_timestamp_idx" ON "click_event"("linkId", "timestamp");

-- CreateIndex
CREATE INDEX "click_event_profileId_timestamp_idx" ON "click_event"("profileId", "timestamp");
