// Comprehensive Socket Test Script
import fetch from 'node-fetch';
import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:5000/api';
let cookies = '';
let socket = null;

async function testSocketFunctionality() {
  console.log('🧪 Testing Socket.io Real-Time Functionality...\n');

  try {
    // 1. Login and get authentication
    console.log('1. 🔐 Authenticating...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'testuser2',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Login failed');
      return;
    }

    const userData = await loginResponse.json();
    console.log('✅ Login successful:', userData.fullName);
    
    // Extract cookies
    const setCookieHeader = loginResponse.headers.get('set-cookie');
    if (setCookieHeader) {
      cookies = setCookieHeader.split(';')[0];
    }

    // 2. Connect to socket
    console.log('\n2. 🔌 Connecting to socket...');
    socket = io('http://localhost:5000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    // Wait for socket connection
    await new Promise((resolve, reject) => {
      socket.on('connect', () => {
        console.log('✅ Socket connected:', socket.id);
        resolve();
      });

      socket.on('connect_error', (error) => {
        console.error('❌ Socket connection error:', error);
        reject(error);
      });

      // Timeout after 5 seconds
      setTimeout(() => reject(new Error('Socket connection timeout')), 5000);
    });

    // 3. Emit user connected
    console.log('\n3. 👤 Emitting userConnected...');
    socket.emit('userConnected', userData._id);
    console.log('✅ Emitted userConnected for:', userData._id);

    // 4. Listen for online users
    socket.on('getOnlineUsers', (users) => {
      console.log('👥 Received online users:', users);
    });

    // 5. Listen for new messages
    socket.on('newMessage', (message) => {
      console.log('📨 Received newMessage via socket:', {
        id: message._id,
        content: message.message,
        sender: message.senderId?.fullName || message.senderId,
        receiver: message.receiverId
      });
    });

    // 6. Send a test message
    console.log('\n4. 📤 Sending test message...');
    const receiverId = '685fd6331ea99f85074770ea';
    const sendResponse = await fetch(`${BASE_URL}/messages/send/${receiverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify({
        message: 'Test message from socket test! ' + new Date().toLocaleTimeString()
      })
    });

    if (sendResponse.ok) {
      const messageData = await sendResponse.json();
      console.log('✅ Message sent successfully');
      console.log('   Message ID:', messageData._id);
      console.log('   Content:', messageData.message);
      console.log('   Sender:', messageData.senderId.fullName);
    } else {
      console.log('❌ Failed to send message');
    }

    // 7. Wait for socket events
    console.log('\n5. ⏳ Waiting for socket events (10 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // 8. Check if we received the message via socket
    console.log('\n6. 📥 Checking received messages...');
    const messagesResponse = await fetch(`${BASE_URL}/messages/${receiverId}`, {
      headers: {
        'Cookie': cookies
      }
    });

    if (messagesResponse.ok) {
      const messages = await messagesResponse.json();
      console.log('✅ Found', messages.length, 'messages');
      if (messages.length > 0) {
        console.log('   Latest message:', messages[messages.length - 1].message);
      }
    }

    console.log('\n🎉 Socket test completed!');
    console.log('\n📝 To test real-time messaging:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Login with testuser2 / password123');
    console.log('   3. Open another tab and login with a different user');
    console.log('   4. Send messages between the tabs');
    console.log('   5. Check browser console for socket logs');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (socket) {
      socket.disconnect();
      console.log('🔌 Socket disconnected');
    }
  }
}

testSocketFunctionality(); 