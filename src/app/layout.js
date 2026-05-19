import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify";
// import { MusicProvider } from "@/Contexts/BgMusicProvider";



export default function RootLayout({ children }) {
  return (
    <html

      lang="en"
      className={` h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 w-10/12 mx-auto">
          <ToastContainer />

          
            {children}
          

        </main>

        <Footer />

      </body>
    </html>
  );
}
