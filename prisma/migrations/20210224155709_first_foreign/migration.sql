-- AddForeignKey
ALTER TABLE "npmg" ADD FOREIGN KEY ("family") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;
