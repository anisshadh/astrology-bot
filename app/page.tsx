"use client";

import { motion } from "framer-motion";
import { Chat } from "@/components/chat";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent flex flex-col items-center justify-start p-4 sm:p-8 pt-12 sm:pt-16">
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          AstroSeer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl"
        >
          Unlock Your Cosmic Destiny
        </motion.p>
        
        <Chat />
      </main>
    </div>
  );
}
