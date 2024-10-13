'use client';
import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Thumbnail = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>('/images/assessment/no-logo.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file size and type (optional)
    if (file.size > 1024 * 1024 * 5) {
      alert('File size is too large! Max 5MB allowed.');
      return;
    }

    // Read and display image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Set the image file for upload
    setImageFile(file);
  };

  return (
    <Box p={0}>
      <Box textAlign="center">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {imageUrl ? (
          <Box>
            <img
              src={imageUrl}
              alt="Preview"
              onClick={handleImageClick}
              style={{
                maxWidth: '300px',
                borderRadius: '7px',
                margin: '0 auto',
              }}
            />
          </Box>
        ) : null}

        <Typography variant="body2" textAlign="center">
          Click on image to upload
        </Typography>
      </Box>
    </Box>
  );
};

export default Thumbnail;
