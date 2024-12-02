'use client';
import { useSelector } from '@/store/hooks';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { AppState } from '@/store/store';
import Image from 'next/image';

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    margin: 8,
    height: 54.5, //customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '174px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === 'dark' ? (
          <Image
            src="/images/logos/cyber-logo.png"
            alt="logo"
            // height={customizer.TopbarHeight}
            height={54.5}
            width={174}
            priority
          />
        ) : (
          <Image
            src={'/images/logos/cyber-logo.png'}
            alt="logo"
            height={54.5}
            width={174}
            priority
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === 'dark' ? (
        <Image
          src="/images/logos/cyber-logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      ) : (
        <Image
          src="/images/logos/cyber-logo.png"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
