-- CreateTable
CREATE TABLE "public"."users" (
    "id" BIGSERIAL NOT NULL,
    "firstname" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_picture" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."spots" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "likes" INTEGER,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" BIGSERIAL NOT NULL,
    "spot_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."likes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "spot_id" BIGINT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."favorites" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "spot_id" BIGINT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."saves" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "spot_id" BIGINT NOT NULL,

    CONSTRAINT "saves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pictures" (
    "id" BIGSERIAL NOT NULL,
    "spot_id" BIGINT NOT NULL,
    "url_picture" TEXT,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_spot_id_key" ON "public"."likes"("user_id", "spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_user_id_spot_id_key" ON "public"."favorites"("user_id", "spot_id");

-- CreateIndex
CREATE UNIQUE INDEX "saves_user_id_spot_id_key" ON "public"."saves"("user_id", "spot_id");

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."saves" ADD CONSTRAINT "saves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."saves" ADD CONSTRAINT "saves_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pictures" ADD CONSTRAINT "pictures_spot_id_fkey" FOREIGN KEY ("spot_id") REFERENCES "public"."spots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
