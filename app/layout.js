import Navbar from "@/components/Navbar";
import "./globals.css";
import Providers from "@/components/Providers"; // Use Providers component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <Providers> {/* Move Provider inside body */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
