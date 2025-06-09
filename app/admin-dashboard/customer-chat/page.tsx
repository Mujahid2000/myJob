'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast, Toaster } from 'sonner';
import io from 'socket.io-client';
import { Send, Search, Phone, Video, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useForm } from 'react-hook-form';
import { Admin, Customer, useGetAdminMessagesQuery, useGetMessagesQuery } from '@/RTKQuery/ChatMessage';

interface ChatMessage extends Admin {}

const socket = io('https://job-server-1.onrender.com', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});

export default function CustomerChatPage() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });

  const company_Name = userEmail?.user.name;
  const userid = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';
  const roomId = socket.id || '';
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { data: customerProfile } = useGetMessagesQuery(userid);
  const profileData = customerProfile?.data;
  const senderid = selectedUser?.senderId || '';
  const senderEmail = selectedUser?.email || '';
  const senderName = selectedUser?.name || '';
  const msgParams = {
    userid: senderid,
    adminId: '6825e7123d8cff36ca7afe9b',
  };
  const { data: chatingMessage } = useGetAdminMessagesQuery(msgParams, { skip: !senderid });
  const message = chatingMessage?.data ?? [];

  // Join socket room and handle connection events
  useEffect(() => {
    if (!userid) return;

    socket.emit('join', userid);
    console.log(`User ${userid} joined the room`);

    const handleConnect = () => console.log('✅ Socket connected');
    const handleDisconnect = () => console.log('❌ Socket disconnected');

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.emit('leave', userid);
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message');
    };
  }, [userid]);

  // Handle incoming socket messages
  useEffect(() => {
    if (!userid || !selectedUser) return;

    const handleMessage = (msg: ChatMessage) => {
      console.log('📨 Incoming socket message:', msg);
      // Ensure the incoming message has a unique _id
      const newMessage = {
        ...msg,
        _id: msg._id || `socket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Fallback unique ID
      };

      // Add to chatMessages only if it's from or to the selected user
      if (newMessage.senderId === senderid || newMessage.receiverId === senderid) {
        setChatMessages((prev) =>
          prev.some((existingMsg) => existingMsg._id === newMessage._id)
            ? prev
            : [...prev, newMessage]
        );
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [userid, senderid, selectedUser]);

  // Sync RTK Query messages into state
  useEffect(() => {
    if (message.length > 0) {
      setChatMessages((prev) => {
        // Merge RTK Query messages, avoiding duplicates
        const existingIds = new Set(prev.map((msg) => msg._id));
        const newMessages = message
          .map((msg) => ({
            ...msg,
            _id: msg._id || `rtk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Fallback unique ID
          }))
          .filter((msg) => !existingIds.has(msg._id));
        return [...prev, ...newMessages];
      });
    }
  }, [message]);

  useEffect(() =>{

  },[])
  // Send message to backend
  const onSubmit = async (data: any) => {
    const newMessage: ChatMessage = {
      _id: `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID for client message
      senderId: userid,
      role: 'customer',
      receiverId: senderid,
      email: email,
      name: company_Name || '',
      message: data.message,
      id: roomId,
      isAdmin: false,
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

    // Add to chatMessages
    setChatMessages((prev) => [...prev, newMessage]);

    try {
      const response = await fetch('http://localhost:5000/liveNotification/customerMessage', {
        method: 'POST',
        body: JSON.stringify(newMessage),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      reset();
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const parseDate = (dateStr: string): Date => {
    const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
    return new Date(cleanDateStr);
  };

  const sortMessagesByTime = (messages: ChatMessage[]): ChatMessage[] => {
    return [...messages].sort(
      (a, b) => parseDate(a.dateWithTime).getTime() - parseDate(b.dateWithTime).getTime()
    );
  };

  const lastMessages = sortMessagesByTime(chatMessages);
  const lastItem = lastMessages.at(lastMessages.length -1);
  const lastUserMessageOrAdmin = lastItem?.message.slice(0,10)



  const filterProfile = profileData && Array.isArray(profileData) && profileData.filter((profile) => profile.senderId !== userid);

  return (
    <div className="space-y-6">
      <Toaster richColors />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Chat</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[80vh]">
        {/* Chat List */}
        <Card className="lg:col-span-1 order-2 lg:order-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">Conversations</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search conversations..." className="pl-10 text-sm" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh]">
              {filterProfile && Array.isArray(filterProfile) && filterProfile.map((user) => (
                <div
                  key={user._id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedUser?._id === user._id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.picture} alt={user.name} />
                        <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-1 w-1 rounded-full border-2 border-white bg-gray-400
                        `}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{user.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">sometimes ago</span>
                         
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                             1
                            </Badge>
                        
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{lastUserMessageOrAdmin || 'Hi'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        {
          selectedUser ? 
           <Card className="lg:col-span-2 order-1 lg:order-2">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src={selectedUser?.picture} alt={selectedUser?.name} />
                  <AvatarFallback>{selectedUser?.name?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base md:text-lg">{selectedUser?.name}</CardTitle>
                  <CardDescription className="text-sm">{selectedUser?.email}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] md:h-[60vh] p-4">
              <div className="flex flex-col gap-3">
                {sortMessagesByTime(chatMessages).map((msg) => (
                  <div
                    key={msg._id}
                    className={`chat ${msg.senderId === userid ? 'chat-end' : 'chat-start'}`}
                  >
                    <div
                      className={`chat-bubble ${
                        msg.senderId === userid ? 'chat-bubble-info' : 'chat-bubble-neutral'
                      }`}
                    >
                      {msg.message}
                      <div className="text-xs text-right opacity-70 mt-1">{msg.dateWithTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)} className="border-t p-3 md:p-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  {...register('message', { required: 'Message is required' })}
                  className="flex-1 min-h-[40px] max-h-[120px] text-sm"
                  rows={1}
                />
                <Button size="sm" className="self-end px-3" disabled={!selectedUser}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {errors.message?.message && (
                <p className="text-red-500 text-sm mt-1">message can not loading</p>
              )}
            </form>
          </CardContent>
        </Card>
          :

          <Card className="lg:col-span-2 order-1 lg:order-2 flex items-center justify-center h-[90vh]">
            <p className="text-gray-500 text-lg">Select a user to start chatting</p>
          </Card>
        }
       
      </div>
    </div>
  );
}