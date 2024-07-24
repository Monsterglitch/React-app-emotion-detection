import React, { useState } from 'react';
import { Button, Input, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [sentiment_from_video, setSentiment_from_video] = useState('');
  const [sentiment_from_audio, setSentiment_from_audio] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    setMessage('');
    setSentiment_from_audio('');
    setSentiment_from_video('');
    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/predict_video/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Text data from audio: ${response.data.Text}`)
      setSentiment_from_video(`Sentiment captured from Video: ${response.data.Emotion}`);
      setSentiment_from_audio(`Sentiment captured from Audio: ${response.data.Sentiment}`)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message);
        } else {
            setMessage('An error occurred while uploading the video.');
        }
        // setMessage('Error uploading file.'+error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Input type="file" accept="video/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} isLoading={uploading}>
        Upload Video
      </Button>
      {message && <Text>{message}</Text>}
      {sentiment_from_audio && <Text>{sentiment_from_audio}</Text>}
      {sentiment_from_video && <Text>{sentiment_from_video}</Text>}
    </VStack>
  );
};

export default FileUpload;
