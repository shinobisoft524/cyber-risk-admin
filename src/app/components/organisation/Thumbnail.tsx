/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import useIsReady from '../Ready';

const Thumbnail = ({
  avatarUrl,
  handleUpdateAvatarUrl,
}: {
  avatarUrl: string;
  handleUpdateAvatarUrl: (url: string) => void;
}) => {
  const isReady = useIsReady();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isReady) {
      setImageUrl(avatarUrl);
    }
  }, [avatarUrl, isReady]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // onChange={(e) => {
  //   const file = e.target.files;
  //   if (file && file[0]) {
  //     setAvatarUrl(URL.createObjectURL(file[0]));
  //   }
  // }}

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
    handleUpdateAvatarUrl(URL.createObjectURL(file));
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
