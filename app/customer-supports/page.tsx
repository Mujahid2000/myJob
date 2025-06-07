'use client';
import { useContext, useEffect, useState } from 'react';
import { Mail, Phone, Send, X } from 'lucide-react';
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
// ChatBubble কম্পোনেন্ট
interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'support';
}


// Socket.IO initialization
const socket = io('http://localhost:5000', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  return (
    <div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          sender === 'user'
            ? 'bg-[#0A65CC] text-white'
            : 'bg-gray-200 text-gray-900'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default function SupportPage() {
  const authContext = useContext(AuthContext);
    const currentUser = authContext?.currentUser;
    const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
    const company_Name = userEmail?.user.name
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [customerChatMessage, setCustomerChatMessage] = useState('');
  const [adminChatMessages, setAdminChatMessages] = useState< { message: string; sender: 'user' | 'support' }[]>([]);
    const userid = userEmail?.user?._id || '';
    const email = userEmail?.user?.email || '';
    const roomId = socket.id;
  useEffect(() =>{
    if(!userid) return

    socket.emit('join', userid);
    console.log(`User ${userid} joined the room`);

    const handleConnect = () =>{
      console.log('connect user')
    }

    const handleDisconnect = () =>{
      console.log('user disconnect')
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect)
    return () =>{
      socket.emit('leave', handleDisconnect)
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)

    }

  },[userid])


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    socket.on('message',(params) => {

    })
    const onSubmit =async (data:any) => {
    const response =await  fetch("http://localhost:5000/liveNotification/customerMessage", {
    method: "POST",
    body: JSON.stringify({
    senderId: userid,
    message: data.message,
    id: roomId
    
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}
);
      reset()
      console.log(response)
    }
    const faqs = [
    {
      question: 'How do I post a job?',
      answer: 'Log in to your account, go to the "Post Job" section, fill in the job details, and submit.',
    },
    {
      question: 'What should I do if my payment fails?',
      answer: 'Check your payment method and try again with correct details. Contact support if the issue persists.',
    },
    {
      question: 'How can I delete my account?',
      answer: 'Go to account settings and select "Delete Account." Contact our support team for further assistance.',
    },
    {
      question: 'How long is a job posting plan valid?',
      answer: 'Our plans are typically valid for 30 days. Visit the "Pricing" page for more details.',
    },
  ];
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleEmailSubmit = () =>{

}


useEffect(() => {

  if (!userid) return;

  const handleMessage = (msg:any) => {
    console.log('📨 New message:', msg);
    setAdminChatMessages(msg)
  };

  socket.on('message', handleMessage);

  return () => {
    socket.off('message', handleMessage);
  };
}, [userid]);

  return (
    <div className="min-h-screen bg-white pt-30">
      {/* Header */}
      <header className=" ">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're here to help with any issues related to job postings or your account. Contact us for quick and easy solutions.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-5 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter the subject"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your issue or question"
                  className="mt-1"
                  rows={5}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0A65CC] text-[1rem] hover:bg-[#084aa6] py-5 cursor-pointer"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-[#0A65CC]" />
                <div>
                  <p className="text-gray-900 font-medium">Email</p>
                  <a href="mailto:support@jobplatform.com" className="text-[#0A65CC] hover:underline">
                    support@jobplatform.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone  className="h-6 w-6 text-[#0A65CC]" />
                <div>
                <p className="text-gray-900 font-medium">Phone</p>
                <a href="tel:+8801234567890" className="text-[#0A65CC] hover:underline">
                  +880 1234-567890
                </a>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4">
              <Send className="h-6 w-6 text-[#0A65CC]" />
              <div className=' '>
                <p className="text-gray-900 font-medium">Live Chat</p>
                <Button
                  variant="link"
                  className="p-0 text-[#0A65CC] hover:underline cursor-pointer"
                  onClick={() => setIsChatOpen(true)}
                >
                  Start Support
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      {/* Live Chat Modal */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Live Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg">
              {adminChatMessages.length === 0 ? (
                <p className="text-gray-500">No messages yet. Type your message here.</p>
              ) : (
                adminChatMessages.map((msg, index) => (
                  <ChatBubble
                    key={index}
                    message={msg.message}
                    sender={msg.sender}
                  />
                ))
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
              <Input
                
                {...register("message", { required: true })}
                placeholder="Type your message"
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-[#0A65CC] hover:bg-[#084aa6] cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChatOpen(false)}
              className="cursor-pointer"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster richColors/>
    </div>
  );
}
