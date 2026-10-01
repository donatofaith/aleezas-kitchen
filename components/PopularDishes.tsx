"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const dishes = [
  {
    name: "Grilled Chicken Lap",
    description: "Grilled chicken served with Aleeza's signature touch.",
    image: "/images/food/grilled-chicken.png",
    tag: "Popular",
  },
  {
    name: "Beef Pancit",
    description: "Stir-fried noodles with beef and colourful vegetables.",
    image: "/images/food/noodles-closeup.png",
    tag: "Recommended",
  },
  {
    name: "Roast Chicken with Spaghetti",
    description: "Roast chicken paired with a comforting spaghetti dish.",
    image: "/images/food/spaghetti-meatballs.png",
    tag: "Customer Pick",
  },
];

export default function PopularDishes() {
  return (
    <section
      id="menu"
      className="bg-[#FFF7F0] px-4 py-24 sm:px-6 md:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-[1450px]">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#D90909]"
            >
              From the kitchen
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-[720px] text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-[-0.06em] text-[#171313]"
            >
              Popular at
              <br />
              <span className="text-[#D90909]">Aleeza&apos;s.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-[410px] text-[15px] leading-7 text-[#746D69] md:text-right"
          >
            A selection of dishes customers have enjoyed and recommended
            from Aleeza&apos;s Kitchen.
          </motion.p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {dishes.map((dish, index) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
              }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#eee] sm:rounded-[34px]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full bg-[#FFF7F0] px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#D90909]">
                  {dish.tag}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <h3 className="max-w-[320px] text-3xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white lg:text-[38px]">
                    {dish.name}
                  </h3>

                  <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/75">
                    {dish.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <motion.a
            href="#full-menu"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex min-h-14 items-center gap-5 rounded-full bg-[#171313] py-2 pl-6 pr-2 font-bold text-white"
          >
            See Menu & What We Offer

            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F5C52D] text-[#171313]">
              ↓
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}