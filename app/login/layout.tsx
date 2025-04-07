
export const metadata = {
    title: 'Login',
    description: 'Access your account securely with our login page.',
  };
  
  export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        {children}
      </div>
    );
  }
  