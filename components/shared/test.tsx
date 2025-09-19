/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCardStyle } from "@/lib/utils";

const CircleWithCards = () => {
  const initialCards = [
    "Mona Lisa – Leonardo da Vinci",
    "The Starry Night – Vincent van Gogh",
    "The Persistence of Memory – Salvador Dalí",
    "Guernica – Pablo Picasso",
    "The Birth of Venus – Sandro Botticelli",
    "The School of Athens – Raphael",
    "Girl with a Pearl Earring – Johannes Vermeer",
    "American Gothic – Grant Wood",
    "The Kiss – Gustav Klimt",
    "Liberty Leading the People – Eugène Delacroix",
    "The Last Supper – Leonardo da Vinci",
    "Impression, Sunrise – Claude Monet",
    "Nighthawks – Edward Hopper",
    "The Great Wave off Kanagawa – Hokusai",
    "Las Meninas – Diego Velázquez",
    "Campbell’s Soup Cans – Andy Warhol",
    "Composition VIII – Wassily Kandinsky",
    "Whistler’s Mother – James McNeill Whistler",
    "Dance at Le Moulin de la Galette – Pierre-Auguste Renoir",
    "The Garden of Earthly Delights – Hieronymus Bosch",
    "The Night Watch – Rembrandt",
    "Creation of Adam – Michelangelo",
    "Girl Before a Mirror – Pablo Picasso",
    "Olympia – Édouard Manet",
    "The Scream – Edvard Munch",
    "Le Déjeuner sur l’herbe – Édouard Manet",
    "Les Demoiselles d’Avignon – Pablo Picasso",
    "Water Lilies – Claude Monet",
    "Sunday Afternoon on the Island of La Grande Jatte – Georges Seurat",
    "American Gothic – Grant Wood",
    "Bal du moulin de la Galette – Pierre-Auguste Renoir",
  ];
  const [cards, setCards] = useState(initialCards);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to rotation angle (counterclockwise)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body {
        height: 300vh; /* Make page scrollable to demonstrate rotation */
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Instructions */}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <p className="text-sm font-medium text-gray-700">
          Scroll to rotate the cards
        </p>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5 sticky top-0">
        <motion.div
          ref={containerRef}
          className="relative w-[500px] h-[500px]"
          style={{ rotate: rotation }} // Scroll-based rotation
        >
          {/* Central Circle */}
          <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full shadow-xl" />

          {/* Cards */}
          {cards.map((card, index) => (
            <motion.div
              key={`${card}-${index}`}
              className="absolute" // Parent div for positioning
              style={getCardStyle(index, cards.length)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.p
                className="font-bold text-sm cursor-pointer whitespace-nowrap px-3 py-1 text-gray-900"
                whileHover={{ scale: 1.1, zIndex: 10, color: "#000" }}
                whileTap={{ scale: 0.95 }}
              >
                {card}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Extra content to make page scrollable */}
      {/* <div className="h-screen" />
      <div className="h-screen" /> */}
    </div>
  );
};

export default CircleWithCards;
