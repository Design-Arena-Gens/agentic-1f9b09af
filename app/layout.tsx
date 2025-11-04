import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Personal Expense Agents',
  description: 'Local-first expense tracking with smart agents',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <div className="container py-6">{children}</div>
      </body>
    </html>
  );
}
