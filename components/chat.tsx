"use client";

import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="w-full max-w-2xl mx-auto mt-2 sm:mt-4 md:mt-6 bg-card/50 backdrop-blur-sm rounded-lg border border-mystical shadow-lg p-2 sm:p-3 md:p-4 constellation-pattern">
      <ScrollArea className="h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] pr-2 sm:pr-4">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-3"
              >
                <div className="min-w-6 h-6 xs:min-w-7 xs:h-7 sm:min-w-8 sm:h-8 rounded-full bg-nebula border border-accent flex items-center justify-center text-xs xs:text-sm sm:text-base">
                  {message.role === "assistant" ? "✨" : "👤"}
                </div>
                <div className="flex-1 bg-muted/30 backdrop-blur-sm p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-lg border border-accent/20">
                  <p className="text-xs xs:text-sm sm:text-base whitespace-pre-wrap text-foreground">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-start gap-3"
            >
              <div className="min-w-8 h-8 rounded-full bg-nebula border border-accent flex items-center justify-center">
                ✨
              </div>
              <div className="flex-1 bg-muted/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-accent/20 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-accent" />
                <p className="text-sm sm:text-base text-foreground">Consulting the stars...</p>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="mt-2 xs:mt-3 sm:mt-4 flex gap-1 xs:gap-1.5 sm:gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your cosmic destiny..."
          className="flex-1 bg-background/50 border border-accent/50 rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-foreground/50"
        />
        <button 
          type="submit" 
          className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 bg-nebula border border-accent text-foreground rounded-lg hover:bg-accent/20 transition-colors text-xs sm:text-sm md:text-base disabled:opacity-50 whitespace-nowrap"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}