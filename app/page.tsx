"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* =========================================================
   DATA
========================================================= */

const menuItems = [
  {
    name: "Jollof Rice",
    image: "/images/food/jollof-rice.png",
    label: "From the Kitchen",
  },
  {
    name: "Beef Pancit",
    image: "/images/food/noodles-closeup.png",
    label: "Customer Favourite",
  },
  {
    name: "Grilled Chicken",
    image: "/images/food/grilled-chicken.png",
    label: "From the Grill",
  },
  {
    name: "Meat Pies",
    image: "/images/food/meat-pie-closeup.png",
    label: "Pastry",
  },
];

const kitchenOffers = [
  {
    number: "01",
    title: "Preordered Meals",
    text: "Meals can be ordered ahead directly from Aleeza’s Kitchen.",
  },
  {
    number: "02",
    title: "Cooking Classes",
    text: "Chef Aleeza also offers cooking classes through the kitchen.",
  },
  {
    number: "03",
    title: "Delivery & Takeaway",
    text: "Enjoy Aleeza’s meals through both delivery and takeaway.",
  },
  {
    number: "04",
    title: "Table Booking",
    text: "Guests can also book ahead when planning to dine in.",
  },
];

const reviews = [
  {
    name: "ezenne",
    initials: "E",
    text:
      "Personally if not the best when it comes to dishes......Aleeza Kitchen offers a delightful culinary experience with a diverse menu that caters to various taste. Aleeza Kitchen combines quality ingredients with skilled preparation, ensuring a satisfying visit for food enthusiasts",
    image: "/images/food/jollof-rice.png",
  },
  {
    name: "Nka Osaro-Higley",
    initials: "NO",
    text:
      "Looked delicious in every way. I had the spaghetti stir fry. When I complained about something, Chef Aleeza found a way to right the wrong. She made customer satisfaction, a priority. She's an amazing Vendor. Have no doubts buying from this vendor!!!",
    image: "/images/food/spaghetti-meatballs.png",
  },
  {
    name: "Oseni Olaoluwani",
    initials: "OO",
    text:
      "Aleeza's Pasta is the real deal 😋. Great balance of flavours.",
    image: "/images/food/noodles-closeup.png",
  },
  {
    name: "Emmanuel Onwujekwe",
    initials: "EO",
    text:
      "Aleeza kitchen is one of the best...... I can't wait to go back there.",
    image: "/images/food/grilled-chicken.png",
  },
];

const openingHours = [
  {
    day: "Monday — Friday",
    time: "10:00 AM — 5:00 PM",
    closed: false,
  },
  {
    day: "Saturday",
    time: "10:00 AM — 4:00 PM",
    closed: false,
  },
  {
    day: "Sunday",
    time: "Closed",
    closed: true,
  },
];

/* =========================================================
   REUSABLE MOTION
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RotatingLogo({
  size = 56,
}: {
  size?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        reduceMotion
          ? {}
          : {
              rotate: 360,
            }
      }
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
      }}
      className="shrink-0"
    >
      <Image
        src="/images/brand/aleeza-logo.png"
        alt="Aleeza's Kitchen"
        width={size}
        height={size}
        className="rounded-full object-contain"
      />
    </motion.div>
  );
}

/* =========================================================
   STEAM / SMOKE
========================================================= */

function FoodSteam() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  const particles = [
    {
      left: "39%",
      delay: 0,
      duration: 4.8,
      width: 38,
      height: 85,
    },
    {
      left: "48%",
      delay: 1.1,
      duration: 5.3,
      width: 50,
      height: 105,
    },
    {
      left: "57%",
      delay: 2.2,
      duration: 4.6,
      width: 34,
      height: 78,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute bottom-[38%] rounded-full bg-white/30 blur-2xl"
          style={{
            left: particle.left,
            width: particle.width,
            height: particle.height,
          }}
          initial={{
            opacity: 0,
            y: 15,
            x: 0,
            scale: 0.6,
          }}
          animate={{
            opacity: [0, 0.65, 0.4, 0],
            y: [15, -25, -70, -125],
            x: [0, -10, 12, -5],
            scale: [0.6, 1, 1.35, 1.7],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [5, -5]
  );

  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-6, 6]
  );

  const [activeReview, setActiveReview] = useState(0);

  function handleMouseMove(
    event: React.MouseEvent<HTMLElement>
  ) {
    if (reduceMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
        rect.width -
      0.5;

    const y =
      (event.clientY - rect.top) /
        rect.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function nextReview() {
    setActiveReview(
      (current) =>
        (current + 1) % reviews.length
    );
  }

  function previousReview() {
    setActiveReview(
      (current) =>
        (current - 1 + reviews.length) %
        reviews.length
    );
  }

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveReview(
        (current) =>
          (current + 1) % reviews.length
      );
    }, 7000);

    return () =>
      window.clearInterval(timer);
  }, [reduceMotion]);

  const currentReview =
    reviews[activeReview];

  return (
    <main className="overflow-x-hidden">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="hero">
        <motion.nav
          className="navbar"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: -30,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <a
            href="#home"
            className="brand"
          >
            <RotatingLogo size={48} />

            <span>
              Aleeza&apos;s Kitchen
            </span>
          </a>

          <div className="navLinks">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#about">About</a>
            <a href="#reviews">
              Reviews
            </a>
            <a href="#contact">
              Contact
            </a>
          </div>

          <motion.a
            href="https://wa.me/2349028779919"
            target="_blank"
            rel="noreferrer"
            className="navOrder"
            whileHover={
              reduceMotion
                ? {}
                : {
                    scale: 1.03,
                  }
            }
            whileTap={{
              scale: 0.97,
            }}
          >
            Order Now
            <span>↗</span>
          </motion.a>
        </motion.nav>

        <section
          className="heroStage"
          id="home"
          onMouseMove={handleMouseMove}
        >
          <div className="heroStripes" />

          <motion.div
            className="glow glowOne"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, 40, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.15, 1],
                  }
            }
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="glow glowTwo"
            animate={
              reduceMotion
                ? {}
                : {
                    x: [0, -30, 0],
                    y: [0, 35, 0],
                    scale: [1, 0.9, 1],
                  }
            }
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* HERO COPY */}

          <div className="heroText">
            <motion.p
              className="heroEyebrow"
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              Aleeza&apos;s Kitchen ·
              Ibadan
            </motion.p>

            <h1 className="heroTitle">
              <motion.span
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                Meals Made
              </motion.span>

              <motion.span
                className="titleAccent"
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                With Love.
              </motion.span>
            </h1>

            <motion.p
              className="heroDescription"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
            >
              Freshly prepared meals, bold
              flavours and comforting
              favourites from the kitchen of
              Chef Aleeza.
            </motion.p>

            <motion.div
              className="heroButtons"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.4,
              }}
            >
              <motion.a
                href="#menu"
                className="menuButton"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Explore Menu
                <span>↗</span>
              </motion.a>

              <motion.a
                href="https://wa.me/2349028779919"
                target="_blank"
                rel="noreferrer"
                className="whatsappButton"
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Order on WhatsApp
              </motion.a>
            </motion.div>
          </div>

          {/* FOOD COMPOSITION */}

          <div className="foodScene">
            <motion.div
              className="foodLabel labelLeft"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Freshly Made
            </motion.div>

            <motion.div
              className="foodLabel labelRight"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [0, 9, 0],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Preordered Meals
            </motion.div>

            <motion.div
              className="floatingFood floatingLeftBack"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [
                        0,
                        -14,
                        0,
                      ],
                      rotate: [
                        -10,
                        -7,
                        -10,
                      ],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/food/meat-pie-closeup.png"
                alt="Meat pies"
                fill
                sizes="220px"
              />
            </motion.div>

            <motion.div
              className="floatingFood floatingLeft"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [
                        0,
                        15,
                        0,
                      ],
                      rotate: [
                        -5,
                        -2,
                        -5,
                      ],
                    }
              }
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/food/noodles-closeup.png"
                alt="Noodles"
                fill
                sizes="270px"
              />
            </motion.div>

            <motion.div
              className="mainFood"
              style={
                reduceMotion
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                    }
              }
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [
                        0,
                        -10,
                        0,
                      ],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="mainFoodInner">
                <Image
                  src="/images/food/jollof-rice.png"
                  alt="Aleeza's Kitchen food"
                  fill
                  priority
                  sizes="(max-width:700px) 80vw, 560px"
                />
              </div>
            </motion.div>

            <motion.div
              className="floatingFood floatingRight"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [
                        0,
                        -16,
                        0,
                      ],
                      rotate: [
                        5,
                        8,
                        5,
                      ],
                    }
              }
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/food/grilled-chicken.png"
                alt="Grilled chicken"
                fill
                sizes="270px"
              />
            </motion.div>

            <motion.div
              className="floatingFood floatingRightBack"
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: [
                        0,
                        13,
                        0,
                      ],
                      rotate: [
                        10,
                        7,
                        10,
                      ],
                    }
              }
              transition={{
                duration: 6.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/images/food/spaghetti-meatballs.png"
                alt="Spaghetti"
                fill
                sizes="220px"
              />
            </motion.div>

            <motion.div
              className="loveBadge"
              animate={
                reduceMotion
                  ? {}
                  : {
                      rotate: 360,
                    }
              }
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative h-[78px] w-[78px] overflow-hidden rounded-full bg-white p-1">
                <Image
                  src="/images/brand/aleeza-logo.png"
                  alt="Aleeza's Kitchen logo"
                  fill
                  sizes="78px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* TICKER */}

          <div className="ticker">
            <motion.div
              className="tickerTrack"
              animate={
                reduceMotion
                  ? {}
                  : {
                      x: [
                        "0%",
                        "-50%",
                      ],
                    }
              }
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span>
                Freshly Prepared
              </span>
              <i>•</i>

              <span>
                Preordered Meals
              </span>
              <i>•</i>

              <span>
                Cooking Classes
              </span>
              <i>•</i>

              <span>
                Made With Love
              </span>
              <i>•</i>

              <span>
                Freshly Prepared
              </span>
              <i>•</i>

              <span>
                Preordered Meals
              </span>
              <i>•</i>

              <span>
                Cooking Classes
              </span>
              <i>•</i>

              <span>
                Made With Love
              </span>
              <i>•</i>
            </motion.div>
          </div>
        </section>
      </section>

      {/* ==================================================
          MENU
      ================================================== */}

      <section
        id="menu"
        className="bg-[#FFF7F0] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="mb-14 flex flex-col gap-7 md:mb-20 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.25em] text-[#D90909]">
                From Aleeza&apos;s Kitchen
              </p>

              <h2 className="max-w-[820px] text-[clamp(52px,7vw,100px)] font-black leading-[0.88] tracking-[-0.065em] text-[#171313]">
                Menu & What
                <br />

                <span className="text-[#D90909]">
                  We Offer.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="max-w-[420px] text-[15px] leading-7 text-[#746D69] md:text-right">
                Meals, pastries and more from
                the kitchen — alongside
                preorders, cooking classes,
                delivery, takeaway and table
                bookings.
              </p>
            </Reveal>
          </div>

          {/* CARDS */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map(
              (dish, index) => (
                <motion.article
                  key={dish.name}
                  initial={{
                    opacity: 0,
                    y: 55,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.75,
                    delay:
                      index * 0.09,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          y: -10,
                          rotate:
                            index % 2 ===
                            0
                              ? -1
                              : 1,
                        }
                  }
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[#eee]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                    <motion.span
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="absolute left-5 top-5 rounded-full bg-[#FFF7F0] px-4 py-2 text-[9px] font-black uppercase tracking-[0.12em] text-[#D90909]"
                    >
                      {dish.label}
                    </motion.span>

                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-[30px] font-black leading-[0.95] tracking-[-0.04em] text-white md:text-[34px]">
                        {dish.name}
                      </h3>
                    </div>
                  </div>
                </motion.article>
              )
            )}
          </div>

          {/* OFFERS */}

          <div className="mt-20 border-t border-black/10 pt-12 md:mt-28 md:pt-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {kitchenOffers.map(
                (offer, index) => (
                  <motion.article
                    key={offer.title}
                    initial={{
                      opacity: 0,
                      y: 28,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.65,
                      delay:
                        index * 0.08,
                    }}
                    className="border-b border-black/10 py-8 md:px-7 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                  >
                    <motion.span
                      initial={{
                        scale: 0.7,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="inline-block text-[11px] font-black text-[#D90909]"
                    >
                      {offer.number}
                    </motion.span>

                    <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#171313]">
                      {offer.title}
                    </h3>

                    <p className="mt-3 max-w-[300px] text-sm leading-6 text-[#746D69]">
                      {offer.text}
                    </p>
                  </motion.article>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          ABOUT
      ================================================== */}

      <section
        id="about"
        className="overflow-hidden bg-[#D90909] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-12"
      >
        <div className="mx-auto grid max-w-[1450px] gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          {/* COPY */}

          <div>
            <Reveal>
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.25em] text-[#F5C52D]">
                Aleeza&apos;s Kitchen
              </p>

              <h2 className="max-w-[760px] text-[clamp(52px,7vw,100px)] font-black leading-[0.87] tracking-[-0.065em]">
                Meals made
                <br />

                <span className="text-[#F5C52D]">
                  with love.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.13}>
              <div className="mt-8 max-w-[640px]">
                <p className="text-[18px] leading-8 text-white/90">
                  The kitchen describes what
                  it does in one simple line:
                  <strong className="font-black text-white">
                    {" "}
                    “Meals Made with Love by
                    Chef Aleeza.”
                  </strong>
                </p>

                <p className="mt-5 text-[15px] leading-7 text-white/75">
                  Based in Ibadan,
                  Aleeza&apos;s Kitchen
                  prepares meals for dining,
                  takeaway and delivery,
                  while also offering
                  preordered meals and
                  cooking classes with Chef
                  Aleeza.
                </p>

                <p className="mt-5 text-[15px] leading-7 text-white/75">
                  Diners describe a kitchen
                  with varied dishes,
                  satisfying food,
                  thoughtful preparation and
                  an owner who takes customer
                  satisfaction seriously.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  "Chef Aleeza",
                  "Preordered Meals",
                  "Cooking Classes",
                  "Delivery",
                  "Takeaway",
                  "Booking",
                ].map(
                  (
                    item,
                    index
                  ) => (
                    <motion.span
                      key={item}
                      whileHover={
                        reduceMotion
                          ? {}
                          : {
                              y: -3,
                              scale: 1.03,
                            }
                      }
                      transition={{
                        delay:
                          index *
                          0.01,
                      }}
                      className="rounded-full border border-white/25 px-4 py-2 text-xs font-bold text-white/90"
                    >
                      {item}
                    </motion.span>
                  )
                )}
              </div>
            </Reveal>
          </div>

          {/* IMAGE COMPOSITION */}

          <div className="relative min-h-[580px] sm:min-h-[700px] lg:min-h-[760px]">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
                rotate: -6,
                scale: 0.92,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: -2,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.9,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      rotate: 0,
                      scale: 1.015,
                    }
              }
              className="absolute left-0 top-6 h-[430px] w-[78%] overflow-hidden rounded-[34px] border-4 border-white sm:h-[540px]"
            >
              <Image
                src="/images/food/noodles-wok.png"
                alt="Food from Aleeza's Kitchen"
                fill
                sizes="(max-width:1024px) 75vw, 550px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
                y: 50,
                rotate: 8,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 4,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,
                delay: 0.14,
              }}
              whileHover={
                reduceMotion
                  ? {}
                  : {
                      y: -8,
                      rotate: 1,
                    }
              }
              className="absolute bottom-6 right-0 h-[270px] w-[55%] overflow-hidden rounded-[30px] border-4 border-white sm:h-[340px]"
            >
              <Image
                src="/images/food/meat-pie-closeup.png"
                alt="Pastries from Aleeza's Kitchen"
                fill
                sizes="(max-width:1024px) 55vw, 420px"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="absolute right-[4%] top-[15%] rounded-full bg-[#FFF7F0] p-2 shadow-2xl"
            >
              <RotatingLogo size={105} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================================================
          REVIEWS
      ================================================== */}

      <section
        id="reviews"
        className="overflow-hidden bg-[#FFF7F0] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1450px]">
          <Reveal className="mb-12 md:mb-16">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-[#D90909]">
              Reviews
            </p>

            <h2 className="max-w-[900px] text-[clamp(48px,6vw,88px)] font-black leading-[0.9] tracking-[-0.06em] text-[#171313]">
              From people who ate
              <br />

              <span className="text-[#D90909]">
                at Aleeza&apos;s.
              </span>
            </h2>
          </Reveal>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.8,
            }}
            className="overflow-hidden rounded-[34px] bg-[#171313]"
          >
            <div className="grid min-h-[620px] lg:grid-cols-[1.15fr_0.85fr]">
              {/* REVIEW COPY */}

              <div className="relative flex min-h-[500px] flex-col justify-between p-7 text-white sm:p-10 md:p-14 lg:p-16">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-[-70px] select-none text-[280px] font-black leading-none text-white/[0.035] sm:text-[400px]"
                >
                  “
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      activeReview
                    }
                    initial={{
                      opacity: 0,
                      y: 30,
                      filter:
                        "blur(8px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter:
                        "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -25,
                      filter:
                        "blur(6px)",
                    }}
                    transition={{
                      duration: 0.55,
                    }}
                    className="relative z-10"
                  >
                    <div className="text-lg tracking-[0.08em] text-[#F5C52D]">
                      ★★★★★
                    </div>

                    <blockquote className="mt-8 max-w-[850px] text-[clamp(26px,3.2vw,49px)] font-black leading-[1.08] tracking-[-0.045em]">
                      “
                      {
                        currentReview.text
                      }
                      ”
                    </blockquote>
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10 mt-12 flex flex-col gap-7 border-t border-white/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`person-${activeReview}`}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 20,
                      }}
                      className="flex items-center gap-4"
                    >
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#D90909] text-sm font-black uppercase">
                        {
                          currentReview.initials
                        }
                      </div>

                      <p className="text-lg font-black">
                        {
                          currentReview.name
                        }
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={
                        previousReview
                      }
                      aria-label="Previous review"
                      whileTap={{
                        scale: 0.92,
                      }}
                      whileHover={{
                        scale: 1.06,
                      }}
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-lg"
                    >
                      ←
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={
                        nextReview
                      }
                      aria-label="Next review"
                      whileTap={{
                        scale: 0.92,
                      }}
                      whileHover={{
                        scale: 1.06,
                      }}
                      className="grid h-12 w-12 place-items-center rounded-full bg-[#F5C52D] text-lg font-black text-[#171313]"
                    >
                      →
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* REVIEW IMAGE */}

              <div className="relative min-h-[400px] overflow-hidden lg:min-h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${activeReview}`}
                    initial={{
                      opacity: 0,
                      scale: 1.12,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={
                        currentReview.image
                      }
                      alt="Food from Aleeza's Kitchen"
                      fill
                      sizes="(max-width:1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 flex gap-2">
                  {reviews.map(
                    (
                      review,
                      index
                    ) => (
                      <button
                        key={
                          review.name
                        }
                        type="button"
                        onClick={() =>
                          setActiveReview(
                            index
                          )
                        }
                        aria-label={`Show review from ${review.name}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          activeReview ===
                          index
                            ? "w-8 bg-[#F5C52D]"
                            : "w-2.5 bg-white/50"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          CONTACT
      ================================================== */}

      <section
        id="contact"
        className="bg-[#F2EEE8] px-5 py-24 sm:px-8 md:py-32 lg:px-12"
      >
        <div className="mx-auto max-w-[1450px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 55,
              scale: 0.975,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.12,
            }}
            transition={{
              duration: 0.9,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="overflow-hidden rounded-[36px] bg-[#171313] text-white"
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* DETAILS */}

              <div className="p-7 sm:p-10 md:p-14 lg:p-16">
                <Reveal>
                  <p className="mb-5 text-[11px] font-black uppercase tracking-[0.25em] text-[#F5C52D]">
                    Visit Aleeza&apos;s Kitchen
                  </p>

                  <h2 className="max-w-[700px] text-[clamp(50px,6vw,92px)] font-black leading-[0.88] tracking-[-0.06em]">
                    Find us in
                    <br />

                    <span className="text-[#D90909]">
                      Oluyole,
                      Ibadan.
                    </span>
                  </h2>
                </Reveal>

                {/* INFO */}

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                  <Reveal delay={0.05}>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                        Location
                      </p>

                      <p className="mt-3 max-w-[320px] text-base font-bold leading-7">
                        7, 3 369156,
                        835208,
                        <br />
                        Oluyole,
                        Ibadan, Oyo
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                        Phone
                      </p>

                      <a
                        href="tel:+2349028779919"
                        className="mt-3 block text-xl font-black transition-colors hover:text-[#F5C52D]"
                      >
                        +234 902 877
                        9919
                      </a>
                    </div>
                  </Reveal>
                </div>

                {/* HOURS */}

                <Reveal delay={0.15}>
                  <div className="mt-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                      Opening Hours
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {openingHours.map(
                        (
                          item,
                          index
                        ) => (
                          <motion.div
                            key={
                              item.day
                            }
                            initial={{
                              opacity: 0,
                              y: 25,
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              delay:
                                index *
                                0.08,
                            }}
                            whileHover={
                              reduceMotion
                                ? {}
                                : {
                                    y: -5,
                                  }
                            }
                            className={`rounded-[22px] border p-5 ${
                              item.closed
                                ? "border-[#D90909]/50 bg-[#D90909]/15"
                                : "border-white/10 bg-white/[0.05]"
                            }`}
                          >
                            <p
                              className={`text-[10px] font-black uppercase tracking-[0.12em] ${
                                item.closed
                                  ? "text-[#FF7777]"
                                  : "text-white/45"
                              }`}
                            >
                              {
                                item.day
                              }
                            </p>

                            {item.closed ? (
                              <div className="mt-4 inline-flex rounded-full bg-[#D90909] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                                Closed
                              </div>
                            ) : (
                              <p className="mt-4 text-sm font-black leading-6">
                                {
                                  item.time
                                }
                              </p>
                            )}
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>

                {/* BUTTONS */}

                <Reveal delay={0.2}>
                  <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                    <motion.a
                      href="https://wa.me/2349028779919?text=Hello%20Aleeza%27s%20Kitchen%2C%20I%27d%20like%20to%20place%20an%20order."
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        y: -4,
                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="flex min-h-[58px] items-center justify-between gap-5 rounded-full bg-[#D90909] py-2 pl-6 pr-2 font-bold"
                    >
                      <span>
                        Order on
                        WhatsApp
                      </span>

                      <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#171313]">
                        ↗
                      </span>
                    </motion.a>

                    <motion.a
                      href="https://wa.me/2349028779919?text=Hello%20Aleeza%27s%20Kitchen%2C%20I%27d%20like%20to%20book%20a%20table."
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{
                        y: -4,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className="flex min-h-[58px] items-center justify-center rounded-full border border-white/20 px-7 font-bold transition-colors hover:bg-white hover:text-[#171313]"
                    >
                      Book a Table
                    </motion.a>
                  </div>
                </Reveal>
              </div>

              {/* FOOD VISUAL */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 70,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 1,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="relative min-h-[460px] overflow-hidden bg-[#D90909] lg:min-h-full"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{
                    scale: 1.1,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                >
                  <Image
                    src="/images/food/jollof-rice.png"
                    alt="Food from Aleeza's Kitchen"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* STEAM */}

                <FoodSteam />

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                {/* DIRECTIONS */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: 0.35,
                    duration: 0.7,
                  }}
                  className="absolute bottom-7 left-7 right-7 z-30 sm:bottom-10 sm:left-10 sm:right-10"
                >
                  <div className="rounded-[24px] bg-[#FFF7F0]/95 p-5 text-[#171313] backdrop-blur-md sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#D90909]">
                          Find
                          Aleeza&apos;s
                        </p>

                        <p className="mt-2 max-w-[310px] text-sm font-semibold leading-6 text-[#665F5B]">
                          Oluyole,
                          Ibadan,
                          Oyo.
                        </p>
                      </div>

                      <motion.a
                        href="https://www.google.com/maps/search/?api=1&query=Aleeza%27s+Kitchen+Oluyole+Ibadan"
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        className="flex min-h-[52px] shrink-0 items-center justify-between gap-5 rounded-full bg-[#171313] py-2 pl-6 pr-2 font-bold"
                      >
                        <span className="text-sm text-white">
                          Directions
                        </span>

                        <motion.span
                          animate={
                            reduceMotion
                              ? {}
                              : {
                                  rotate: [
                                    0,
                                    12,
                                    0,
                                  ],
                                }
                          }
                          transition={{
                            duration: 2.5,
                            repeat:
                              Infinity,
                            repeatDelay:
                              1.5,
                          }}
                          className="grid h-10 w-10 place-items-center rounded-full bg-[#F5C52D] font-black text-[#171313]"
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="overflow-hidden bg-[#171313] px-5 pb-8 pt-16 text-white sm:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto max-w-[1450px]">
            <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.5fr_0.7fr_0.8fr]">
              <div>
                <div className="flex items-center gap-3">
                  <RotatingLogo
                    size={62}
                  />

                  <p className="text-xl font-black">
                    Aleeza&apos;s
                    Kitchen
                  </p>
                </div>

                <p className="mt-6 max-w-[420px] text-sm leading-7 text-white/55">
                  Meals made with
                  love by Chef
                  Aleeza in Ibadan.
                </p>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
                  Explore
                </p>

                <div className="mt-5 flex flex-col gap-3 text-sm font-semibold">
                  {[
                    [
                      "Home",
                      "#home",
                    ],
                    [
                      "Menu",
                      "#menu",
                    ],
                    [
                      "About",
                      "#about",
                    ],
                    [
                      "Reviews",
                      "#reviews",
                    ],
                    [
                      "Contact",
                      "#contact",
                    ],
                  ].map(
                    ([
                      label,
                      href,
                    ]) => (
                      <motion.a
                        key={
                          label
                        }
                        href={
                          href
                        }
                        whileHover={{
                          x: 5,
                          color:
                            "#F5C52D",
                        }}
                      >
                        {
                          label
                        }
                      </motion.a>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
                  Follow
                </p>

                <div className="mt-5 flex flex-col gap-3 text-sm font-semibold">
                  <motion.a
                    href="https://www.instagram.com/aleezaskitchen/"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      x: 5,
                    }}
                  >
                    Instagram ↗
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/chefaleeza/"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      x: 5,
                    }}
                  >
                    Facebook ↗
                  </motion.a>

                  <motion.a
                    href="https://wa.me/2349028779919"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      x: 5,
                    }}
                  >
                    WhatsApp ↗
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © 2026 Aleeza&apos;s
                Kitchen. All rights
                reserved.
              </p>

              <motion.a
                href="#home"
                whileHover={{
                  y: -3,
                }}
                className="font-bold text-white/55"
              >
                Back to top ↑
              </motion.a>
            </div>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}