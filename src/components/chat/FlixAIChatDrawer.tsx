"use client";

import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Bot, User } from "lucide-react";
import { useChatDrawerStore } from "@/stores/chatDrawerStore";
import { geminiService } from "@/services/chatbotService";
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function FlixAIChatDrawer() {
  const { isOpen, closeDrawer } = useChatDrawerStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là FlixAI. Hỏi tôi bất kỳ điều gì website mà bạn muốn nhé!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message =))
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChatResponse = async () => {
    try {
      const res = await geminiService.callChat(input);
      console.log("chekc res", res.data.answer);
      return res.data.answer;
    } catch (error: any) {
      console.log("Error from chat response", error.message);
      return "";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setInput("");

    // Giả lập phản hồi từ AI (thay bằng API thật sau)
    const aiResponse = await getChatResponse();
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse || "Xin lỗi, tôi không hiểu câu hỏi",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent className="h-[85vh] max-h-screen bg-[#0f1419] border-t border-[#2a3040]/60 focus:outline-none focus-visible:outline-none ">
        <div className="flex flex-col h-full max-w-2xl mx-auto">
          {/* Header */}
          <DrawerHeader className="border-b border-[#2a3040]/50 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#0f1419]" />
                </div>
                <div>
                  <DrawerTitle className="text-yellow-400 text-xl">
                    FlixAI Say Hi
                  </DrawerTitle>
                  <DrawerDescription className="text-gray-400">
                    Hỏi gì cũng được! Còn biết hay không thì hên xui hihi
                  </DrawerDescription>
                </div>
              </div>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-yellow-400 hover:bg-transparent hover:shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Chat Messages */}
          <div ref={scrollAreaRef} className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-[#0f1419]" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#d4af37] to-[#f5d547] text-[#0f1419]"
                        : "bg-[#1a1f2e] text-gray-200 border border-[#2a3040]/50"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {msg.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-[#2a3040] rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-yellow-400" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f5d547] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#0f1419]" />
                  </div>
                  <div className="bg-[#1a1f2e] border border-[#2a3040]/50 px-4 py-3 rounded-2xl">
                    <div className="flex gap-2">
                      <span
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <DrawerFooter className="border-t border-[#2a3040]/50 pt-4 pb-6 px-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi FlixAI điều gì đó..."
                className="flex-1 bg-[#1a1f2e] border-[#2a3040] text-white placeholder:text-gray-500 focus-visible:ring-yellow-400/50"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-[#d4af37] to-[#f5d547] hover:from-[#f5d547] hover:to-[#d4af37] text-[#0f1419] font-semibold cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              FlixAI có thể đưa ra câu trả lời chưa chính xác. Hãy kiểm tra lại
              thông tin quan trọng.
            </p>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
