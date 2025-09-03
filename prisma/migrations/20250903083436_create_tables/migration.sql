-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_picture" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."spot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "favorite" TEXT,
    "save" TEXT,
    "likes" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comment" (
    "id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3),

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "spot_id" INTEGER NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."picture" (
    "id" SERIAL NOT NULL,
    "spot_id" INTEGER NOT NULL,
    "url_picture" TEXT,

    CONSTRAINT "picture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."like" ADD CONSTRAINT "like" FOREIGN KEY ("spot_id") REFERENCES "public"."spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."picture" ADD CONSTRAINT "picture_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
