// Test Real-time Messaging Flow
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api'; // Test through frontend proxy
let cookies = '';

async function testRealTimeFlow() {
  console.log('🧪 Testing Complete Real-Time Flow...\n');

  try {
    // 1. Login through frontend
    console.log('1. 🔐 Authenticating through frontend...');
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

    // 2. Get users (conversations)
    console.log('\n2. 👥 Getting conversations...');
    const usersResponse = await fetch(`${BASE_URL}/users`, {
      headers: {
        'Cookie': cookies
      }
    });

    if (usersResponse.ok) {
      const users = await usersResponse.json();
      console.log('✅ Found', users.length, 'users');
      if (users.length > 0) {
        console.log('   First user:', users[0].fullName, '(ID:', users[0]._id + ')');
      }
    }

    // 3. Send a message
    console.log('\n3. 📤 Sending message...');
    const receiverId = '685fd6331ea99f85074770ea';
    const sendResponse = await fetch(`${BASE_URL}/messages/send/${receiverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies
      },
      body: JSON.stringify({
        message: 'Real-time test message! ' + new Date().toLocaleTimeString()
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

    // 4. Get messages
    console.log('\n4. 📥 Getting messages...');
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

    console.log('\n🎉 Real-time flow test completed!');
    console.log('\n📝 Next steps for testing real-time messaging:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Login with testuser2 / password123');
    console.log('   3. Open another browser tab and login with a different user');
    console.log('   4. Start a conversation between the two users');
    console.log('   5. Send messages and watch them appear in real-time');
    console.log('   6. Check browser console for socket connection logs');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testRealTimeFlow(); 