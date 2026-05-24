import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

// KNOWLEDGE BASE 
const knowledgeBase = [
  // 1. SHIPPING & DELIVERY
  { keywords: ["shipping cost", "delivery fee", "how much is shipping", "free shipping"], answer: "We offer FREE standard shipping on all orders over $50! For orders under $50, standard shipping is a flat rate of $5.99." },
  { keywords: ["shipping time", "how long", "delivery time", "when will i get"], answer: "Standard shipping takes 3-5 business days. We also offer Express Shipping (1-2 days) at checkout for an additional fee." },
  { keywords: ["international", "ship worldwide", "other countries"], answer: "Yes! We ship globally. International shipping usually takes 7-14 business days depending on customs." },
  { keywords: ["courier", "who delivers", "fedex", "ups", "dhl"], answer: "We partner with trusted couriers like UPS, FedEx, and DHL to ensure your tech arrives safely." },
  { keywords: ["weekend", "saturday", "sunday"], answer: "Our couriers deliver Monday through Saturday. Sunday delivery is currently not available." },
  { keywords: ["lost package", "stolen", "never arrived"], answer: "Oh no! If your tracking says delivered but you don't have it, please contact support@nuvexastore.com within 48 hours so we can open an investigation." },
  
  // 2. RETURNS & REFUNDS
  { keywords: ["return policy", "can i return", "send it back"], answer: "We have a hassle-free 30-day return policy! Items must be in their original packaging and unused." },
  { keywords: ["refund time", "when is my refund", "money back"], answer: "Once we receive your return, it takes 3-5 business days to inspect the item, and another 2-3 days for the refund to appear on your bank statement." },
  { keywords: ["exchange", "wrong size", "different color"], answer: "To exchange an item, the fastest way is to return your original item for a refund and place a new order for the item you want." },
  { keywords: ["return label", "pay for return", "free returns"], answer: "We provide prepaid return labels for defective items. For general returns, a $4.99 return shipping fee is deducted from your refund." },
  { keywords: ["broken", "damaged", "defective", "not working"], answer: "We apologize for that! Please take a photo of the damaged item and email it to support@nuvexastore.com. We will ship a replacement immediately." },
  
  // 3. PAYMENT, PRICING & DISCOUNTS
  { keywords: ["payment methods", "how to pay", "accept paypal", "apple pay"], answer: "We accept all major Credit Cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay." },
  { keywords: ["cod", "cash on delivery"], answer: "Currently, we do not offer Cash on Delivery. All orders must be paid securely online at checkout." },
  { keywords: ["installments", "klarna", "afterpay", "finance"], answer: "Yes! We partner with Klarna and Afterpay so you can split your purchase into 4 interest-free payments at checkout." },
  { keywords: ["promo code", "discount", "coupon"], answer: "You can apply promo codes in your cart before checkout. P.S. Use code WELCOME10 for 10% off your first order!" },
  { keywords: ["student discount", "unidays", "college discount"], answer: "Yes! We offer a 15% discount for students. Just verify your student email address at checkout to automatically apply the discount." },
  { keywords: ["military discount", "veteran"], answer: "We salute our troops! Active military and veterans can verify their status at checkout to receive a 10% discount on all orders." },
  { keywords: ["price match", "cheaper somewhere else", "price guarantee"], answer: "We do not currently offer price matching, but we constantly monitor the market to ensure our prices are highly competitive!" },
  { keywords: ["tax", "taxes", "vat", "customs", "duties"], answer: "Sales tax and international customs duties are calculated dynamically at checkout based on your shipping address." },
  
  // 4. ORDER MANAGEMENT
  { keywords: ["track order", "where is my order", "tracking number"], answer: "Once your order ships, we'll email you a tracking link. You can also log in to your account and view tracking under 'Order History'." },
  { keywords: ["cancel order", "cancel my order"], answer: "Orders can be canceled within 1 hour of placement. Please visit your account dashboard to click 'Cancel Order', or contact support immediately." },
  { keywords: ["change address", "wrong address"], answer: "If you entered the wrong address, please email support@nuvexastore.com immediately. We can only change it if the order hasn't shipped yet." },
  { keywords: ["modify order", "add item", "change item"], answer: "We process orders very quickly! We cannot add items to an existing order, but you can cancel within 1 hour and place a new one." },
  { keywords: ["processing", "fulfilled", "unfulfilled"], answer: "'Processing' means we are packing your order. 'Fulfilled' means it has shipped. 'Unfulfilled' means we just received it and are getting it ready!" },
  { keywords: ["invoice", "receipt", "tax invoice"], answer: "Your digital invoice is emailed to you immediately after purchase. You can also download PDF invoices from your Account Dashboard." },
  
  // 5. PRODUCTS & INVENTORY
  { keywords: ["out of stock", "restock", "when will you have more", "sold out"], answer: "Popular items usually restock within 2-3 weeks. You can click 'Notify Me' on the product page to get an email as soon as it's back!" },
  { keywords: ["pre-order", "preorder", "reserve"], answer: "Pre-order items will show an estimated shipping date on the product page. You'll be charged at checkout to reserve your item." },
  { keywords: ["authentic", "real", "fake", "original"], answer: "All our products are 100% authentic and sourced directly from verified manufacturers and official distributors." },
  { keywords: ["size guide", "how do sizes run", "measurements"], answer: "We provide a detailed size guide on every apparel product page! Generally, our items run true to size." },
  { keywords: ["warranty", "guarantee"], answer: "All our electronics come with a standard 1-year manufacturer's warranty covering hardware defects." },
  
  // 6. LOYALTY, GIFT CARDS & PROGRAMS
  { keywords: ["rewards", "loyalty", "points"], answer: "Join our Nuvexa Rewards program for free! You earn 1 point for every $1 spent, which can be redeemed for exclusive discounts." },
  { keywords: ["refer a friend", "referral", "invite"], answer: "Give $10, get $10! Share your unique referral link from your account page, and when your friend makes their first purchase, you both get a reward." },
  { keywords: ["gift card", "gift certificate"], answer: "We offer digital gift cards ranging from $10 to $500. They are delivered instantly via email and never expire!" },
  { keywords: ["gift wrap", "wrap it", "send as gift"], answer: "We offer premium gift wrapping for a flat fee of $3.99 per item. Just select the 'Gift Wrap' option in your cart!" },
  { keywords: ["affiliate program", "ambassador", "influencer"], answer: "Are you a creator? We'd love to partner with you! Check out our Affiliate Program link in the footer to apply and earn commissions." },
  { keywords: ["wholesale", "bulk order"], answer: "For bulk orders and B2B pricing, please reach out to wholesale@nuvexastore.com." },

  // 7. ACCOUNT, TECH & PRIVACY
  { keywords: ["password", "forgot password", "reset password"], answer: "No worries! Click 'Log In' at the top right, then click 'Forgot Password' to receive a reset link in your email." },
  { keywords: ["guest checkout", "without account"], answer: "Yes, you can absolutely check out as a guest without creating an account!" },
  { keywords: ["error", "bug", "glitch", "website down", "can't checkout"], answer: "I'm sorry you're having trouble! Try clearing your browser cache or using incognito mode. If the issue persists, email support@nuvexastore.com." },
  { keywords: ["mobile app", "download app", "ios app", "android app"], answer: "Our website is fully optimized for mobile devices, and we are actively working on native iOS and Android apps. Stay tuned!" },
  { keywords: ["stop emails", "unsubscribe", "spam"], answer: "You can unsubscribe from our marketing emails at any time by clicking the 'Unsubscribe' link at the bottom of any of our promotional emails." },
  { keywords: ["privacy", "sell my data", "is my data safe", "gdpr"], answer: "We take your privacy seriously. We use bank-level encryption and never sell your personal data. View our Privacy Policy in the footer for details." },
  
  // 8. COMPANY INFO & GREETINGS
  { keywords: ["contact", "customer service", "phone number", "email", "talk to human"], answer: "You can reach our human support team at support@nuvexastore.com or call us at 1-800-NUVEXA. We are available Mon-Fri, 9am-6pm IST." },
  { keywords: ["physical store", "location", "in person", "brick and mortar"], answer: "We are currently an online-only platform, which helps us pass the savings directly to you! Our headquarters is located in Jaipur, India." },
  { keywords: ["business hours", "what time do you close", "support hours"], answer: "Our online store is open 24/7! Our customer support team is available Monday through Friday, from 9:00 AM to 6:00 PM." },
  { keywords: ["sustainability", "eco friendly", "environment", "green"], answer: "We are committed to sustainability! We use recyclable packaging and partner with carbon-neutral shipping providers whenever possible." },
  { keywords: ["jobs", "hiring", "careers", "work for"], answer: "We're always looking for talented folks to join the Nuvexa team! Check out the 'Careers' link in our footer for open positions." },
  { keywords: ["hello", "hi", "hey", "good morning", "good afternoon"], answer: "Hello! Welcome to NuvexaStore. Are you looking for anything specific, or do you have a question about our policies?" },
  { keywords: ["who are you", "are you a robot", "bot"], answer: "I'm the Nuvexa AI Assistant! I'm here to help you find products and answer your questions instantly." },
  { keywords: ["bye", "goodbye", "thanks", "thank you"], answer: "You're very welcome! Let me know if you need anything else. Have a great day!" }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm the Nuvexa Assistant. I can help you find products, track orders, or answer questions about our store!",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [botProducts, setBotProducts] = useState([]);
  const messagesEndRef = useRef(null);

  // Check Redux state
  const reduxProducts = useSelector((state) => state.products?.data || []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // SELF-SUFFICIENT BOT LOGIC!
  useEffect(() => {
    if (reduxProducts.length > 0) {
      setBotProducts(reduxProducts);
    } 
  }, [reduxProducts]);

  // CHATBOT BRAIN
  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    const cleanInput = lowerInput.replace(/-/g, " ");

    // 1. DYNAMIC API LOGIC: Check if user is asking about specific categories
    const uniqueCategories = [...new Set(botProducts.map((p) => p.category))];

    for (let category of uniqueCategories) {
      if (!category) continue;

      const cleanCategory = category.replace(/-/g, " ").toLowerCase();
      const singularCategory = cleanCategory.endsWith("s")
        ? cleanCategory.slice(0, -1)
        : cleanCategory;

      if (
        cleanInput.includes(cleanCategory) ||
        cleanInput.includes(singularCategory)
      ) {
        const categoryItems = botProducts.filter(
          (p) => p.category === category,
        );
        const displayCategory =
          cleanCategory.charAt(0).toUpperCase() + cleanCategory.slice(1);

        return `Yes, we have ${categoryItems.length} items in the ${displayCategory} category! For example, our ${categoryItems[0].title} is only $${categoryItems[0].price}. Head to our Products page to see them all.`;
      }
    }

    // 2. DYNAMIC API LOGIC: Check if user is searching for a specific product name
    const foundProduct = botProducts.find((p) => {
      const cleanTitle = p.title.toLowerCase().replace(/-/g, " ");
      return cleanInput.includes(cleanTitle);
    });

    if (foundProduct) {
      return `I found it! The ${foundProduct.title} is currently available for $${foundProduct.price}. It has a rating of ${foundProduct.rating}⭐. You can find it by searching for it on our Products page.`;
    }

    // 3. FAQ KNOWLEDGE BASE
    for (let qa of knowledgeBase) {
      const isMatch = qa.keywords.some((keyword) =>
        lowerInput.includes(keyword),
      );
      if (isMatch) {
        return qa.answer;
      }
    }

    // 4. FALLBACK RESPONSE
    return "That's a great question! I'm still learning, but our human support team can definitely help. You can email them at support@nuvexastore.com. Is there anything else I can try to answer?";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = { text: generateBotResponse(input), sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* FLOATING ACTION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen
            ? "bg-[#f5f5f7] dark:bg-[#141414] text-black dark:text-white scale-90"
            : "bg-black dark:bg-white text-white dark:text-black hover:scale-110 active:scale-95"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* CHAT WINDOW */}
      <div
        className={`absolute bottom-20 right-0 w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] bg-white dark:bg-[#0a0a0a] rounded-3xl border border-black/[0.04] dark:border-white/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-50 opacity-0 invisible"
        }`}
      >
        {/* Header */}
        <div className="bg-[#f5f5f7] dark:bg-[#141414] px-6 py-5 flex items-center gap-3 border-b border-black/[0.04] dark:border-white/[0.08]">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0a0a0a] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-neutral-900 dark:text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Nuvexa Assistant
            </h2>
            <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              Online
            </p>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white/50 dark:bg-[#0a0a0a]/50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 text-sm font-medium leading-relaxed rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-black text-white dark:bg-white dark:text-black rounded-tr-sm"
                    : "bg-[#f5f5f7] dark:bg-[#141414] text-neutral-900 dark:text-white rounded-tl-sm border border-transparent dark:border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-white dark:bg-[#0a0a0a] border-t border-black/[0.04] dark:border-white/[0.08] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a product..."
            className="flex-1 px-4 py-3 bg-[#f5f5f7] dark:bg-[#141414] border border-transparent hover:border-gray-200 dark:hover:border-white/10 text-sm font-medium text-neutral-900 dark:text-white rounded-2xl outline-none focus:border-black dark:focus:border-white transition-all duration-300"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-md"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};;

export default Chatbot;