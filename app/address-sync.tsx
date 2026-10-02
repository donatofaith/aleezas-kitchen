"use client";

import { useEffect } from "react";

const CORRECT_ADDRESS =
  "Akinwunmi Ogundare St, Oluyole 200131, Ibadan, Oyo, Nigeria";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Akinwunmi+Ogundare+St%2C+Oluyole+200131%2C+Ibadan%2C+Oyo%2C+Nigeria";

export default function AddressSync() {
  useEffect(() => {
    const updateAddress = () => {
      const contact = document.querySelector("#contact");
      if (!contact) return;

      const paragraphs = Array.from(contact.querySelectorAll("p"));

      paragraphs.forEach((paragraph) => {
        const text = paragraph.textContent?.replace(/\s+/g, " ").trim() ?? "";

        if (
          text.includes("369156") ||
          text === "Oluyole, Ibadan, Oyo." ||
          text === "Oluyole, Ibadan, Oyo"
        ) {
          paragraph.textContent = CORRECT_ADDRESS;
        }
      });

      const mapLinks = Array.from(
        contact.querySelectorAll<HTMLAnchorElement>("a[href*='google.com/maps']")
      );

      mapLinks.forEach((link) => {
        link.href = MAP_URL;
      });
    };

    updateAddress();

    const observer = new MutationObserver(updateAddress);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
