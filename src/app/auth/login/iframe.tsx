'use client';

import useIsReady from '@/app/components/Ready';

export default function Vimeo() {
  const isReady = useIsReady();
  if (!isReady) return <></>;
  return (
    <iframe
      src="https://player.vimeo.com/video/912936909?h=200ebc5101&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
      allow="autoplay; fullscreen; picture-in-picture"
      title="CyberPrism Testimonial"
      name="fitvid0"
    ></iframe>
  );
}
