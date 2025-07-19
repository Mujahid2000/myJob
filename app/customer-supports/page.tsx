'use client';
import { useContext, useEffect, useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import io from 'socket.io-client';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useForm } from 'react-hook-form';
import { Admin, useGetAdminMessagesQuery } from '@/RTKQuery/ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage extends Admin {}

const socket = io('https://job-server-1.onrender.com', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});

export default function SupportPage() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });

  const company_Name = userEmail?.user.name;
  const userid = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';
  const roomId = socket.id || '';
  const name = userEmail?.user.name || '';
  const msgParams = {
    userid: userid,
    adminId: '6825e7123d8cff36ca7afe9b',
  };
  const { data: adminData } = useGetAdminMessagesQuery(msgParams);
  const adminMessages = adminData?.data ?? [];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Join socket room and handle incoming messages
  useEffect(() => {
    if (!userid) return;

    socket.emit('join', userid);
    console.log(`User ${userid} joined the room`);

    const handleMessage = (msg: ChatMessage) => {
      console.log('📨 Incoming socket message:', msg);
      // Ensure the incoming message has a unique _id
      const newMessage = {
        ...msg,
        _id: msg._id || `socket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Fallback unique ID
      };

      // Prevent duplicate messages by checking _id
      setChatMessages((prev) =>
        prev.some((existingMsg) => existingMsg._id === newMessage._id)
          ? prev
          : [...prev, newMessage]
      );
    };

    socket.on('message', handleMessage);

    return () => {
      socket.emit('leave', userid);
      socket.off('message', handleMessage);
    };
  }, [userid]);

  // Sync RTK messages into state
  useEffect(() => {
    if (adminMessages.length > 0) {
      setChatMessages((prev) => {
        // Merge adminMessages with existing chatMessages, avoiding duplicates
        const existingIds = new Set(prev.map((msg) => msg._id));
        const newMessages = adminMessages
          .map((msg) => ({
            ...msg,
            _id: msg._id || `rtk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Fallback unique ID
          }))
          .filter((msg) => !existingIds.has(msg._id));
        return [...prev, ...newMessages];
      });
    }
  }, [adminMessages]);

  // Send message to backend
  const onSubmit = async (data: any) => {
    const newMessage: ChatMessage = {
      _id: `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for client message
      senderId: userid,
      role: 'Admin',
      receiverId: '6825e7123d8cff36ca7afe9b',
      email: email,
      name: name,
      message: data.message,
      id: roomId,
      isAdmin: true,
      isRead: false,
      dateWithTime: new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      createdAt: '',
      updatedAt: '',
      __v: 0,
    };

    // Add the new message to chatMessages
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      await fetch('https://job-server-1.onrender.com/liveNotification/customerMessage', {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      reset();
    } catch (err) {
      toast.error('Message failed to send');
    }
  };

  const faqs = [
    {
      question: 'How do I post a job?',
      answer:
        'Log in to your account, go to the "Post Job" section, fill in the job details, and submit.',
    },
    {
      question: 'What should I do if my payment fails?',
      answer:
        'Check your payment method and try again with correct details. Contact support if the issue persists.',
    },
    {
      question: 'How can I delete my account?',
      answer:
        'Go to account settings and select "Delete Account." Contact our support team for further assistance.',
    },
    {
      question: 'How long is a job posting plan valid?',
      answer:
        'Our plans are typically valid for 30 days. Visit the "Pricing" page for more details.',
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const parseDate = (dateStr: string): Date => {
    const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(cleanDateStr);
  };

  const sortMessagesByTime = (messages: ChatMessage[]): ChatMessage[] => {
    return [...messages].sort(
      (a, b) =>
        parseDate(a.dateWithTime).getTime() - parseDate(b.dateWithTime).getTime()
    );
  };
// authentication logic for chat feature where if the user is not logged in, they cannot start a chat, and if the user is an admin, they cannot start a chat either.
  const handleChatOpen = () => {
    // if use not available then not open the chat box
    if(!userid && !userEmail){
      toast.error('Please log in to start a chat.');
      return;
      // if user is admin then not open the chat box
    } else if(currentUser?.email === "admin1@gmail.com" || userEmail?.user.role === "Admin") {
      toast.error('Admin cannot start a chat.');
      setIsChatOpen(false);
      return;
    }
    // if user is logged in then open the chat box
    setIsChatOpen(true);  
  }

  return (
    <div className="min-h-screen bg-white pt-30">
      <header>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help with any issues related to job postings or your
            account.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-5 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
              <Button
                type="button"
                className="w-full bg-[#0A65CC] hover:bg-[#084aa6] py-5"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-[#0A65CC]" />
                <div>
                  <p className="text-gray-900 font-medium">Email</p>
                  <a
                    href="mailto:support@jobplatform.com"
                    className="text-[#0A65CC] hover:underline"
                  >
                    support@jobplatform.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-[#0A65CC]" />
                <div>
                  <p className="text-gray-900 font-medium">Phone</p>
                  <a
                    href="tel:+8801234567890"
                    className="text-[#0A65CC] hover:underline"
                  >
                    +880 1234-567890
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4">
              <Send className="h-6 w-6 text-[#0A65CC]" />
              <div>
                <p className="text-gray-900 font-medium">Live Chat</p>
                <Button
                  variant="link"
                  className="p-0 text-[#0A65CC]"
                  onClick={handleChatOpen}
                >
                  Start Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions (FAQ)
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Live Chat</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* chat message show section */}
             <ScrollArea className="h-[300px] md:h-[400px] p-4">
              <div className="flex flex-col gap-3">
                {sortMessagesByTime(chatMessages)
                  .filter((msg) => msg.receiverId === userid || msg.senderId === userid)
                  .map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.senderId === userid ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-full text-wrap rounded-lg p-3 ${
                          msg.senderId === userid
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p>{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {msg.dateWithTime}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <Input
                {...register('message', { required: true })}
                placeholder="Type your message"
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-[#0A65CC] hover:bg-[#084aa6]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChatOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster richColors />
    </div>
  );
}