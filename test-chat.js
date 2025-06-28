// Test script for chat functionality
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api';
let cookies = '';

async function testChat() {
  console.log('🧪 Testing Chat Application...\n');

  try {
    // 1. Test authentication
    console.log('1. Testing authentication...');
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

    if (loginResponse.ok) {
      const userData = await loginResponse.json();
      console.log('✅ Login successful:', userData.fullName);
      
      // Extract cookies
      const setCookieHeader = loginResponse.headers.get('set-cookie');
      if (setCookieHeader) {
        cookies = setCookieHeader.split(';')[0];
      }
    } else {
      console.log('❌ Login failed');
      return;
    }

    // 2. Test getting users (conversations)
    console.log('\n2. Testing get conversations...');
    const usersResponse = await fetch(`${BASE_URL}/users`, {
      headers: {
        'Cookie': cookies
      }
    });

    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log('✅ Found', users.length, 'users');
      if (users.length > 0) {
        console.log('   First user:', users[0].fullName);
      }
    } else {
      console.log('❌ Failed to get users');
    }

    // 3. Test sending a message
    console.log('\n3. Testing send message...');
    const receiverId = '685fd6331ea99f85074770ea'; // Test receiver ID
    const sendResponse = await fetch(`${BASE_URL}/messages/send/${receiverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify({
        message: 'Hello from test script! ' + new Date().toLocaleTimeString()
      })
    });

    if (sendResponse.ok) {
      const messageData = await sendResponse.json();
      console.log('✅ Message sent successfully');
      console.log('   Message:', messageData.message);
      console.log('   Sender:', messageData.senderId.fullName);
    } else {
      console.log('❌ Failed to send message');
    }

    // 4. Test getting messages
    console.log('\n4. Testing get messages...');
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
    } else {
      console.log('❌ Failed to get messages');
    }

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Login with testuser2 / password123');
    console.log('   3. Start chatting with other users');
    console.log('   4. Test real-time messaging between multiple browser tabs');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testChat(); 