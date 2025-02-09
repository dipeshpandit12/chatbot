import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ChatbotPage = () => {
  const router = useRouter();
  const id = router.query.id;

  const strategyPrompts = {
    'reviews': 'reward customers for leaving reviews',
    'website': 'build a professional website',
    'content': 'create engaging social media content',
    'story': 'share your business journey',
  };

  const [response, setResponse] = useState('');

  const handlePrompt = async () => {
    try {
      const res = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        prompt: `Hi, I'm your marketing assistant. Here are some ways to ${strategyPrompts[id]}:`,
        max_tokens: 2048,
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
          'Content-Type': 'application/json',
        },
      });

      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      handlePrompt();
    }
  }, [id]);

  return (
    <div>
      <h1>Marketing Assistant</h1>
      <p>{response}</p>
    </div>
  );
};

export default ChatbotPage;
