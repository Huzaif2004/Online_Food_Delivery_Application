import React, { useState } from 'react';

const VoiceSearch = ({ onSearch }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false; // To stop after one result
    recognition.interimResults = false; // To avoid partial results
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcriptResult = event.results[current][0].transcript;
      setTranscript(transcriptResult);
      onSearch(transcriptResult); // Call the parent function to handle the search
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ', event.error);
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={startListening}>
        {listening ? 'Listening...' : 'Start Voice Search'}
      </button>
      {transcript && <p>Search Query: {transcript}</p>}
    </div>
  );
};

export default VoiceSearch;
