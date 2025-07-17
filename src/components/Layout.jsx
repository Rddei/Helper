'use client';
import Navbar from '../components/Navbar';   // Sesuaikan path jika perlu
import Footer from '../components/Footer';   // Sesuaikan path jika perlu
import styles from '../components/Layout.module.css'; // Sesuaikan path jika perlu
import '../style/Styles.css'; // Impor global styles di sini

// Komponen layout menerima 'children' sebagai prop.
// 'children' ini akan menjadi komponen halaman (page.jsx) Anda.
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className={styles.layoutContainer}>
          <Navbar />
          <main className={styles.mainContent}>
            {children} {/* Menggantikan <Outlet /> */}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}