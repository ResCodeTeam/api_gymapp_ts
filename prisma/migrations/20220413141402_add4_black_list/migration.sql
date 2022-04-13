-- CreateTable
CREATE TABLE "black_list" (
    "tokenId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,

    CONSTRAINT "black_list_pkey" PRIMARY KEY ("tokenId")
);

-- AddForeignKey
ALTER TABLE "black_list" ADD CONSTRAINT "fkblack_list909983" FOREIGN KEY ("uid") REFERENCES "users"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION;
