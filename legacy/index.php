<?php
session_start();
?>
<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="Website Resmi Enterprise Infrastructure Management (EIM) Research Lab Telkom University. Pusat riset jaringan, cloud computing, dan optimasi data di TULT-0809.">
    <meta name="keywords"
        content="EIM, EIM Research Lab, Telkom University, Enterprise Infrastructure Management, Laboratorium Jaringan, Cloud Computing, Riset Jaringan">
    <meta name="author" content="EIM Research Lab">
    <meta property="og:title" content="EIM Research Lab - Telkom University">
    <meta property="og:description"
        content="Pusat riset teknologi jaringan komputer, infrastruktur enterprise, cloud computing, dan optimalisasi sistem informasi.">
    <meta property="og:url" content="https://instagram.com/eimresearchlab">
    <meta property="og:type" content="website">

    <title>EIM Research Lab - Enterprise Infrastructure Management</title>

    <!-- Link FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Link CSS -->
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- --- NAVIGATION BAR --- -->
    <nav class="navbar" id="navbar">
        <div class="container">
            <a href="index.php" class="logo-container">
                <div class="logo-icon">
                    <img src="img/EIM Only Logo.png" alt="EIM Logo">
                </div>
                <div class="logo-text">
                    <span class="text-gradient-dual">EIM</span>
                    <span class="logo-sub">Research Lab</span>
                </div>
            </a>

            <ul class="nav-links" id="nav-links">
                <li class="active"><a href="index.php">Home</a></li>
                <li><a href="about.php">About</a></li>
                <li><a href="event.php">Event</a></li>
                <li><a href="structure.php">Structure</a></li>
                <li><a href="news.php">News</a></li>
                
                <?php if (isset($_SESSION["user_id"])): ?>
                    <li><a href="pendaftaran.php">Pendaftaran</a></li>
                    <li><a href="logout.php" style="color: var(--accent-red);">Logout</a></li>
                <?php else: ?>
                    <li><a href="login.php" style="color: var(--accent-cyan);">Login</a></li>
                <?php endif; ?>
            </ul>

            <div class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- --- HERO SECTION --- -->
    <header class="hero" id="home">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-tag">
                        <span></span> Enterprise Infrastructure Management Lab
                    </div>
                    <h1>
                        Membangun <span class="text-gradient-red">Infrastruktur</span> Digital Masa Depan dengan <span
                            class="text-gradient-cyan">Riset & AI</span>
                    </h1>
                    <p class="hero-desc">
                        Kami melakukan riset, pengkajian mendalam, dan pelatihan di bidang teknologi jaringan
                        enterprise, optimalisasi data center, cloud computing, serta otomasi infrastruktur.
                    </p>
                    <div class="hero-actions">
                        <a href="pendaftaran.php" class="btn btn-primary"
                            style="box-shadow: var(--glow-cyan-intense); transform: scale(1.05);">Daftar Asisten
                            Sekarang <i class="fa-solid fa-user-plus"></i></a>
                        <a href="structure.php" class="btn btn-secondary">Lihat Struktur Asisten <i
                                class="fa-solid fa-users"></i></a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="visual-orbit">
                        <div class="visual-core">
                            <i class="fa-solid fa-server fa-3x text-gradient-dual"></i>
                        </div>
                        <div class="visual-node node-1" title="Cloud Computing">
                            <i class="fa-solid fa-cloud"></i>
                        </div>
                        <div class="visual-node node-2" title="Cyber Security">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>
                        <div class="visual-node node-3" title="Network Infrastructure">
                            <i class="fa-solid fa-network-wired"></i>
                        </div>
                        <div class="visual-node node-4" title="AI & Data Optimization">
                            <i class="fa-solid fa-microchip"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subsection 1: Fokus Riset & Laboratorium -->
            <div style="margin-top: 100px;">
                <div class="section-title">
                    <h2>Fokus Riset & Laboratorium</h2>
                    <p>Kami berfokus pada pilar-pilar penting teknologi infrastruktur teknologi informasi skala besar.
                    </p>
                </div>
                <div class="focus-grid">
                    <div class="focus-card glass-panel">
                        <div class="focus-icon">
                            <i class="fa-solid fa-network-wired"></i>
                        </div>
                        <h3>Network Optimization</h3>
                        <p>Mengkaji efisiensi rute, protokol switching & routing, simulasi beban trafik jaringan, dan
                            interkoneksi regional berskala enterprise.</p>
                    </div>
                    <div class="focus-card glass-panel">
                        <div class="focus-icon">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <h3>Cloud Infrastructure</h3>
                        <p>Implementasi private & public cloud, containerization (Docker, Kubernetes), network
                            virtualization, dan integrasi hybrid data center.</p>
                    </div>
                    <div class="focus-card glass-panel">
                        <div class="focus-icon">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <h3>Network Automation & AI</h3>
                        <p>Otomatisasi konfigurasi switch/router menggunakan Ansible/Python, monitoring performa
                            jaringan cerdas berbasis kecerdasan buatan.</p>
                    </div>
                </div>
            </div>

            <!-- Subsection 2: Divisi Lab EIM secara singkat -->
            <div style="margin-top: 100px;">
                <div class="section-title">
                    <h2>Divisi Laboratorium EIM</h2>
                    <p>Laboratorium EIM terdiri dari 6 divisi utama yang saling berkolaborasi dalam riset dan
                        operasional secara terpadu.</p>
                </div>
                <div class="divisions-brief-grid">
                    <a href="structure.php?div=inti" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>INTI</h4>
                        <p>Koordinator, Sekretaris, dan Bendahara yang mengelola operasional internal lab.</p>
                    </a>
                    <a href="structure.php?div=riset" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>RISET</h4>
                        <p>Fokus pada penelitian infrastruktur, AI, dan publikasi ilmiah.</p>
                    </a>
                    <a href="structure.php?div=pku" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>PKU</h4>
                        <p>Pengembangan Kapasitas Utama melalui pelatihan Cisco dan networking.</p>
                    </a>
                    <a href="structure.php?div=lomba" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>LOMBA</h4>
                        <p>Mempersiapkan tim kompetitif untuk ajang kejuaraan IT & Jaringan nasional.</p>
                    </a>
                    <a href="structure.php?div=medhum" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>MEDHUM</h4>
                        <p>Media dan Hubungan Masyarakat untuk branding dan penyebaran informasi.</p>
                    </a>
                    <a href="structure.php?div=pengmas" class="div-brief-card glass-panel" style="display: block; cursor: pointer;">
                        <h4>PENGMAS</h4>
                        <p>Pengabdian Masyarakat yang selalu dilakukan secara berkala untuk membantu masyarakat.</p>
                    </a>
                </div>
            </div>

            <!-- Subsection 3: Berita Terakhir -->
            <div style="margin-top: 100px; margin-bottom: 20px;">
                <div class="section-title">
                    <h2>Berita Terakhir</h2>
                    <p>Kabar terbaru dan rilis artikel terkini dari EIM Research Lab.</p>
                </div>
                <div id="latest-news-container" class="news-grid">
                    <!-- Loaded dynamically by JS -->
                </div>
                <div style="text-align: center; margin-top: 40px;">
                    <a href="news.php" class="btn btn-secondary">Lihat Semua Berita <i
                            class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </header>

    <!-- --- FOOTER --- -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <a href="index.php" class="logo-container">
                        <div class="logo-icon" style="width: 30px; height: 30px;">
                            <img src="img/EIM Only Logo.png" alt="EIM Logo">
                        </div>
                        <div class="logo-text">
                            <span class="text-gradient-dual" style="font-size: 1.2rem;">EIM</span>
                            <span class="logo-sub" style="font-size: 0.6rem; letter-spacing: 1px;">Research Lab</span>
                        </div>
                    </a>
                    <p>Enterprise Infrastructure Management (EIM) Research Laboratory merupakan bagian dari Kelompok
                        Keahlian Enterprise & Industrial System (EIS), Program Studi S1 Sistem Informasi, Fakultas
                        Rekayasa Industri, Telkom University.</p>
                </div>

                <div>
                    <h4 class="footer-title">Navigasi Cepat</h4>
                    <ul class="footer-links">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="about.php">About</a></li>
                        <li><a href="event.php">Event</a></li>
                        <li><a href="structure.php">Structure</a></li>
                        <li><a href="news.php">News</a></li>
                        
                <?php if (isset($_SESSION["user_id"])): ?>
                    <li><a href="pendaftaran.php">Pendaftaran</a></li>
                    <li><a href="logout.php" style="color: var(--accent-red);">Logout</a></li>
                <?php else: ?>
                    <li><a href="login.php" style="color: var(--accent-cyan);">Login</a></li>
                <?php endif; ?>
            </ul>
                </div>

                <div>
                    <h4 class="footer-title">Kontak & Lokasi</h4>
                    <ul class="footer-links" style="margin-bottom: 20px;">
                        <li><i class="fa-solid fa-location-dot"
                                style="margin-right: 8px; color: var(--accent-red);"></i> Gedung TULT Lantai 8, Ruangan
                            TULT.08.09</li>
                        <li><i class="fa-solid fa-university" style="margin-right: 8px; color: var(--accent-red);"></i>
                            Telkom University, Bandung, Indonesia</li>
                        <li><i class="fa-solid fa-envelope" style="margin-right: 8px; color: var(--accent-cyan);"></i>
                            eimlab@telkomuniversity.ac.id</li>
                    </ul>
                    <h4 class="footer-title" style="margin-bottom: 12px; font-size: 0.95rem;">Ikuti Media Sosial Kami
                    </h4>
                    <div class="footer-socials">
                        <a href="https://www.instagram.com/eimresearchlab/" target="_blank" class="footer-social-btn"
                            title="Instagram @eimresearchlab">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" class="footer-social-btn" title="YouTube Channel">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2026 EIM Research Laboratory. All Rights Reserved.</p>
                <p>Designed with <i class="fa-solid fa-heart" style="color: var(--accent-red);"></i> in Telkom
                    University</p>
            </div>
        </div>
    </footer>

    <!-- --- TOAST NOTIFICATIONS --- -->
    <div class="toast-container" id="toast-container"></div>

    <!-- Link App JS -->
    <script src="app.js"></script>
</body>

</html>