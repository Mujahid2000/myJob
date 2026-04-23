'use client';

import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast, Toaster } from 'sonner';
import io from 'socket.io-client';
import { Send, Search, Phone, Video, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { AuthContext } from '@/Authentication/AuthContext';
import { useGetUserByIdQuery } from '@/RTKQuery/authSlice';
import { useForm } from 'react-hook-form';
import { Admin, Customer, useGetAdminMessagesQuery, useGetMessagesQuery } from '@/RTKQuery/ChatMessage';

interface ChatMessage extends Admin { }

const socket = io('https://job-server-fqvf.onrender.com', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});

export default function CustomerChatPage() {
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail } = useGetUserByIdQuery(currentUser?.email || '', {
    skip: !currentUser?.email,
  });

  const company_Name = userEmail?.data.name;
  const userid = userEmail?.data?._id || '';
  const email = userEmail?.data?.email || '';
  const roomId = socket.id || '';
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { data: customerProfile } = useGetMessagesQuery(userid);
  const profileData = customerProfile?.data;
  const senderid = selectedUser?.senderId || '';
  const msgParams = {
    userid: senderid,
    adminId: '6825e7123d8cff36ca7afe9b',
  };
  const { data: chatingMessage } = useGetAdminMessagesQuery(msgParams, { skip: !senderid });
  const message = chatingMessage?.data ?? [];

  const handleSelectUser = (user: Customer) => {
    setSelectedUser(user);
    setChatMessages([]);
  };

  const handleBack = () => {
    setSelectedUser(null);
    setChatMessages([]);
  };

  // Join socket room and handle connection events
  useEffect(() => {
    if (!userid) return;

    socket.emit('join', userid);

    const handleConnect = () => console.log('Socket connected');
    const handleDisconnect = () => console.log('Socket disconnected');

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
      const newMessage = {
        ...msg,
        _id: msg._id || `socket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

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
        const existingIds = new Set(prev.map((msg) => msg._id));
        const newMessages = message
          .map((msg) => ({
            ...msg,
            _id: msg._id || `rtk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }))
          .filter((msg) => !existingIds.has(msg._id));
        return [...prev, ...newMessages];
      });
    }
  }, [message]);

  // Send message to backend
  const onSubmit = async (data: any) => {
    const accessToken = localStorage.getItem('Access_Token') || '';
    if (!accessToken) {
      toast.error('Please sign in again to send a message.');
      return;
    }

    const newMessage: ChatMessage = {
      _id: `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
    const { _id, ...outboundMessage } = newMessage;

    try {
      const response = await fetch('https://job-server-fqvf.onrender.com/liveNotification/customerMessage', {
        method: 'POST',
        body: JSON.stringify(outboundMessage),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${accessToken}`,
          token: accessToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to send message');
      }

      setChatMessages((prev) => [...prev, newMessage]);
      reset();
      toast.success('Message sent successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      toast.error(errorMessage);
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

  const filterProfile = profileData && Array.isArray(profileData) && profileData.filter((profile) => profile.senderId !== userid);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <Toaster richColors />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <h2 className="text-base md:text-xl lg:text-2xl font-bold">Customer Chat</h2>
      </div>

      {/* Main layout */}
      <div className="flex flex-1 min-h-0 border rounded-lg overflow-hidden">
        {/* Conversation List - hidden on mobile when a chat is open */}
        <div className={`w-full lg:w-80 xl:w-96 shrink-0 border-r flex flex-col ${selectedUser ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-3 border-b shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search conversations..." className="pl-10 text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filterProfile && filterProfile.length > 0 ? (
              filterProfile.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedUser?._id === user._id ? 'bg-blue-50 border-l-2 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleSelectUser(user)}
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={user.picture} alt={user.name} />
                    <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium truncate text-sm">{user.name}</p>
                      <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] shrink-0">
                        1
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-sm text-gray-400">
                No conversations yet
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        {selectedUser ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 border-b shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 lg:hidden h-8 w-8"
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={selectedUser?.picture} alt={selectedUser?.name} />
                  <AvatarFallback>{selectedUser?.name?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{selectedUser?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{selectedUser?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-3">
                {sortMessagesByTime(chatMessages)
                  .filter((uM) => uM.senderId === selectedUser.senderId || uM.receiverId === selectedUser.senderId)
                  .map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${msg.senderId === userid ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                          msg.senderId === userid
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                        <p className={`text-[10px] mt-1 text-right ${
                          msg.senderId === userid ? 'text-blue-100' : 'text-gray-400'
                        }`}>
                          {msg.dateWithTime}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit(onSubmit)} className="border-t p-3 shrink-0">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  {...register('message', { required: 'Message is required' })}
                  className="flex-1 min-h-[40px] max-h-[120px] resize-none text-sm"
                  rows={1}
                />
                <Button type="submit" size="icon" className="shrink-0 h-10 w-10 rounded-full">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {errors.message?.message && (
                <p className="text-red-500 text-xs mt-1">Message cannot be empty</p>
              )}
            </form>
          </div>
        ) : (
          /* Empty state - hidden on mobile (shows list instead), visible on desktop */
          <div className="hidden lg:flex flex-1 items-center justify-center text-gray-400">
            <p className="text-lg">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
