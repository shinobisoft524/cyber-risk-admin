import GuestGuard from '@/app/components/guard/GuestGuard';

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default function LoginLayout({ children }: Props) {
  return <GuestGuard>{children}</GuestGuard>;
}
