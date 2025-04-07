export const metadata = {
  title: "Shopping Bag",
  description: "View and manage your cart items.",
};

export default function BagLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-black text-white p-8">{children}</div>;
}
