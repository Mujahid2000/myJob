"use client"

import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import io from 'socket.io-client';
import { Send, Search, Phone, Video, MoreHorizontal } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AuthContext } from "@/Authentication/AuthContext"
import { useGetUserByIdQuery } from "@/RTKQuery/authSlice"
import { useForm } from "react-hook-form"


const socket = io('http://localhost:5000', {
  withCredentials: false,
  extraHeaders: { 'Content-Type': 'application/json' },
});

const chatUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    avatar: "SJ",
    status: "online",
    lastMessage: "I need help with uploading my resume",
    timestamp: "2 min ago",
    unread: 2,
  }
]

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    message: "Hi, I'm having trouble uploading my resume. The file seems to be too large.",
    timestamp: "10:30 AM",
    isAdmin: false,
  },
  {
    id: 2,
    sender: "Admin",
    message: "Hello Sarah! I'd be happy to help you with that. What's the file size of your resume?",
    timestamp: "10:32 AM",
    isAdmin: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    message: "It's about 5MB. Is that too large?",
    timestamp: "10:33 AM",
    isAdmin: false,
  },
  {
    id: 4,
    sender: "Admin",
    message:
      "Yes, our current limit is 2MB. You can compress the PDF or convert it to a smaller format. Would you like me to send you a guide on how to do this?",
    timestamp: "10:35 AM",
    isAdmin: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    message: "It's about 5MB. Is that too large?",
    timestamp: "10:33 AM",
    isAdmin: false,
  },
  {
    id: 6,
    sender: "Admin",
    message:
      "Yes, our current limit is 2MB. You can compress the PDF or convert it to a smaller format. Would you like me to send you a guide on how to do this?",
    timestamp: "10:35 AM",
    isAdmin: true,
  },
  {
    id: 7,
    sender: "Sarah Johnson",
    message: "It's about 5MB. Is that too large?",
    timestamp: "10:33 AM",
    isAdmin: false,
  },
  {
    id: 8,
    sender: "Admin",
    message:
      "Yes, our current limit is 2MB. You can compress the PDF or convert it to a smaller format. Would you like me to send you a guide on how to do this?",
    timestamp: "10:35 AM",
    isAdmin: true,
  },
]

export default function page() {
  const [selectedUser, setSelectedUser] = useState(chatUsers[0])
  const [newMessage, setNewMessage] = useState("")
  const authContext = useContext(AuthContext);
  const currentUser = authContext?.currentUser;
  const { data: userEmail, error: userEmailError } = useGetUserByIdQuery(currentUser?.email || '', { skip: !currentUser?.email });
  const company_Name = userEmail?.user.name
  const userid = userEmail?.user?._id || '';
  const email = userEmail?.user?.email || '';
  const roomId = socket.id;
  const [customerChatMessage, setCustomerChatMessage] = useState()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

useEffect(() => {
  if (!userid) return;

  socket.emit('join', userid);
  console.log(`User ${userid} joined the room`);

  const handleConnect = () => console.log('✅ Socket connected');
  const handleDisconnect = () => console.log('❌ Socket disconnected');

  socket.on('connect', handleConnect);
  socket.on('disconnect', handleDisconnect);

  return () => {
    socket.off('connect', handleConnect);
    socket.off('disconnect', handleDisconnect);
    socket.off('message');
  };
}, [userid]);

useEffect(() => {

  if (!userid) return;

  const handleMessage = (msg:any) => {
    console.log('📨 New message:', msg);
    setCustomerChatMessage(msg)
  };

  socket.on('message', handleMessage);

  return () => {
    socket.off('message', handleMessage);
  };
}, [userid]);


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

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[82vh]">
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
              {chatUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedUser.id === user.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                          user.status === "online" ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{user.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{user.timestamp}</span>
                          {user.unread > 0 && (
                            <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {user.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 order-1 lg:order-2">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback>{selectedUser.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base md:text-lg">{selectedUser.name}</CardTitle>
                  <CardDescription className="text-sm">{selectedUser.email}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isAdmin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${message.isAdmin ? "text-blue-100" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleSubmit(onSubmit)}  className="border-t p-3 md:p-4">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  {...register("message", { required: true })}
                  className="flex-1 min-h-[40px] max-h-[120px] text-sm"
                  rows={1}
                />
                <Button size="sm" className="self-end px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
