// src/components/Navbar.jsx
'use client'; // WAJIB untuk komponen interaktif

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'; // Ganti dari react-router-dom
import { Globe, Menu, X } from 'lucide-react';

// Aset & Komponen
import Logo from '../assets/logo-sandbox.svg';
import Button from './Button';
import IconAplikasi from '../assets/icon/ic-megamenu-aplikasi.svg';
import IconSolusi from '../assets/icon/ic-megamenu-solusi.svg';
import IconInfrastruktur from '../assets/icon/ic-megamenu-infrastruktur.svg';
import IconData from '../assets/icon/ic-megamenu-data.svg';
import styles from './Navbar.module.css'; // Impor CSS Module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [leaveTimeout, setLeaveTimeout] = useState(null);

  const pathname = usePathname(); // Hook dari Next.js
  const router = useRouter();   // Hook dari Next.js

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler untuk mega menu
  const handleMouseEnter = (label) => {
    clearTimeout(leaveTimeout);
    setHoveredItem(label);
  };
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setHoveredItem(null), 200);
    setLeaveTimeout(timeout);
  };

  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "Solusi Produk",
      href: "/solusi-produk",
      megaMenu: true,
      items: [
        { label: "Aplikasi", description: "Aplikasi kami dirancang untuk meningkatkan efisiensi...", href: "/solusi-produk?filter=aplikasi", icon: IconAplikasi },
        { label: "Solusi", description: "Sandbox memiliki beragam solusi inovatif...", href: "/solusi-produk?filter=solusi", icon: IconSolusi },
        { label: "Infrastruktur", description: "Infrastruktur yang dirancang berfokus pada scalabilities...", href: "/solusi-produk?filter=infrastruktur", icon: IconInfrastruktur },
        { label: "Data", description: "Data menjadi inti dari setiap keputusan bisnis...", href: "/solusi-produk?filter=data", icon: IconData },
      ],
    },
    { label: "Tentang Sandbox", href: "/tentang-sandbox" },
    { label: "Bantuan", href: "/bantuan" },
  ];

  const handleLinkClick = (href) => {
    setIsOpen(false);
    setHoveredItem(null);
    router.push(href);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : styles.navTop}`}>
      <div className={styles.container}>
        <Image src={Logo} className={styles.logo} alt="Sandbox Logo" />

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => {
              const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
              
              if (item.megaMenu) {
                return (
                  <li key={item.label} className={styles.menuItem} onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                    <button type="button" className={`${styles.menuButton} ${isActive ? styles.active : ''}`}>
                      {item.label}
                      <span className={styles.underline} />
                    </button>
                    {hoveredItem === item.label && (
                      <div className={styles.megaMenu} onMouseEnter={() => handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                        {item.items.map((subItem) => (
                          <div key={subItem.label} className={styles.megaMenuItem}>
                            <button type="button" onClick={() => handleLinkClick(subItem.href)} className={styles.megaMenuButton}>
                              <Image src={subItem.icon} alt={`${subItem.label} icon`} className={styles.megaMenuIcon} />
                              <div>
                                <div className={styles.megaMenuLabel}>{subItem.label}</div>
                                <p className={styles.megaMenuDescription}>{subItem.description}</p>
                              </div>
                            </button>
                          </div>
                        ))}
                        <div className={styles.megaMenuFooter}>
                          <div>
                            <p className={styles.megaMenuFooterTitle}>SOLUSI SANDBOX</p>
                            <p className={styles.megaMenuFooterDescription}>Eksplorasi Produk Sandbox untuk Meningkatkan Produktivitas Bisnis Anda</p>
                          </div>
                          <Button onClick={() => handleLinkClick("/solusi-produk")} variant="filled" shape="default">Semua</Button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label} className={styles.menuItem}>
                  <Link href={item.href} className={`${styles.menuLink} ${isActive ? styles.active : ''}`}>
                    {item.label}
                    <span className={styles.underline} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button type="button" className={styles.globeButton}><Globe size={24} /></button>
          <Button href="/kontak-kami" variant="outline" shape="rounded">Kontak Kami</Button>
        </div>

        {/* Mobile Toggle Button */}
        <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className={styles.mobileToggleButton}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            {menuItems.map((item) => {
              const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.label}>
                  <button type="button" onClick={() => handleLinkClick(item.href)} className={`${styles.mobileMenuButton} ${isActive ? styles.active : ''}`}>
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <Button href="/kontak-kami" onClick={() => setIsOpen(false)} variant="outline" shape="rounded" className="w-full text-center mt-2">
                Kontak Kami
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;