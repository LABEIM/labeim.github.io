import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

let pool;

export async function getDbPool() {
  if (pool) return pool;

  try {
    // 1. Connect without database to ensure the database exists
    const tempConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
    });

    await tempConnection.query('CREATE DATABASE IF NOT EXISTS `eim_db`');
    await tempConnection.end();

    // 2. Create the connection pool with the database specified
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eim_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // 3. Initialize tables and seed initial data
    await initTables(pool);

    return pool;
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error);
    throw error;
  }
}

async function initTables(dbPool) {
  try {
    // Users table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        nim VARCHAR(50) NOT NULL,
        telp VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user'
      )
    `);

    // Events table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL,
        event_date VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        link VARCHAR(255) NOT NULL,
        image LONGTEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        organizer VARCHAR(255) NULL,
        benefits TEXT NULL,
        requirements TEXT NULL,
        show_register TINYINT(1) DEFAULT 1
      )
    `);

    // Ensure existing database gets the new columns
    try {
      await dbPool.query('ALTER TABLE events ADD COLUMN link VARCHAR(255) NULL');
    } catch (err) {}
    try {
      await dbPool.query('ALTER TABLE events ADD COLUMN show_register TINYINT(1) DEFAULT 1');
    } catch (err) {}
    try {
      await dbPool.query('ALTER TABLE events ADD COLUMN organizer VARCHAR(255) NULL');
    } catch (err) {}
    try {
      await dbPool.query('ALTER TABLE events ADD COLUMN benefits TEXT NULL');
    } catch (err) {}
    try {
      await dbPool.query('ALTER TABLE events ADD COLUMN requirements TEXT NULL');
    } catch (err) {}
    try {
      await dbPool.query('ALTER TABLE events MODIFY COLUMN event_date VARCHAR(100) NOT NULL');
    } catch (err) {}

    // News table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL,
        news_date DATE NOT NULL,
        content TEXT NOT NULL,
        image LONGTEXT NOT NULL
      )
    `);

    // Ensure news table is updated
    try {
      await dbPool.query('ALTER TABLE news CHANGE COLUMN date news_date DATE NOT NULL');
    } catch (err) {}

    console.log('Database tables verified/created successfully.');

    // Seed default admin if not exists
    const [userRows] = await dbPool.query('SELECT id FROM users WHERE email = ?', ['admin@eim.com']);
    if (userRows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await dbPool.query(
        'INSERT INTO users (nama, username, nim, telp, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Administrator', 'admin', '000000', '08123456789', 'admin@eim.com', hashedPassword, 'admin']
      );
      console.log('Default admin seeded (admin@eim.com / admin123).');
    }

    // Seed events if empty
    const [eventRows] = await dbPool.query('SELECT COUNT(*) as count FROM events');
    if (eventRows[0].count === 0) {
      const defaultEvents = [
        {
          title: "Mengenal Next.js",
          category: "Study Group",
          status: "upcoming",
          event_date: "2026-06-09",
          description: "Kegiatan belajar bersama pengenalan Next.js untuk pengembangan web modern.",
          link: "event-detail.php",
          image: JSON.stringify(["https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"]),
          icon: "fa-graduation-cap",
          organizer: "EIM Research Lab",
          benefits: JSON.stringify(["E-Certificate", "Knowledge base Next.js", "Networking"]),
          requirements: JSON.stringify(["Membawa laptop", "Memiliki dasar JS/HTML", "Terbuka untuk umum"])
        },
        {
          title: "Company Visit Huawei Jakarta 2026",
          category: "Company Visit",
          status: "completed",
          event_date: "2026-06-09",
          description: "Kunjungan industri ke kantor pusat Huawei di Jakarta untuk melihat perkembangan teknologi telekomunikasi terbaru.",
          link: "event-detail.php",
          image: JSON.stringify(["https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"]),
          icon: "fa-building-columns",
          organizer: "EIM Research Lab",
          benefits: JSON.stringify(["Industri insight", "Merchandise", "Transportasi gratis"]),
          requirements: JSON.stringify(["Khusus mahasiswa TelU", "Menggunakan almamater"])
        }
      ];
      for (const e of defaultEvents) {
        await dbPool.query(
          'INSERT INTO events (title, category, status, event_date, description, link, image, icon, organizer, benefits, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [e.title, e.category, e.status, e.event_date, e.description, e.link, e.image, e.icon, e.organizer, e.benefits, e.requirements]
        );
      }
      console.log('Default events seeded.');
    }

    // Seed news if empty
    const [newsRows] = await dbPool.query('SELECT COUNT(*) as count FROM news');
    if (newsRows[0].count === 0) {
      const defaultNews = [
        {
          title: "Pengumuman Rekrutmen Asisten Baru 2026",
          category: "Pengumuman",
          author: "Admin EIM",
          news_date: "2026-06-24",
          content: "Laboratorium EIM membuka kesempatan bagi mahasiswa untuk bergabung menjadi asisten laboratorium. Segera daftarkan diri Anda!",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
        },
        {
          title: "Chevening Scholarship",
          category: "Beasiswa",
          author: "UK Government",
          news_date: "2026-06-25",
          content: "Chevening adalah program beasiswa global Pemerintah Inggris yang menawarkan kesempatan kepada pemimpin masa depan untuk belajar di Inggris. Beasiswa ini diberikan kepada mahasiswa berprestasi dengan potensi kepemimpinan.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200"
        }
      ];
      for (const n of defaultNews) {
        await dbPool.query(
          'INSERT INTO news (title, category, author, news_date, content, image) VALUES (?, ?, ?, ?, ?, ?)',
          [n.title, n.category, n.author, n.news_date, n.content, n.image]
        );
      }
      console.log('Default news seeded.');
    }
  } catch (error) {
    console.error('Error initializing database tables:', error);
  }
}
