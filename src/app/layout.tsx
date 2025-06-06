import './globals.css';

export const metadata = {
  title: 'My Dashboard',
  description: 'A real-time dash built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
