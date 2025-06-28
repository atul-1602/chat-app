export default function handler(req, res) {
  console.log('Debug API called:', req.method, req.url);
  
  res.status(200).json({ 
    message: 'Debug API is working!',
    method: req.method,
    url: req.url,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
} 