import mysql from 'mysql2/promise';

async function test() {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eim_db'
    });
    
    try {
      await db.query('ALTER TABLE news CHANGE COLUMN date news_date DATE NOT NULL');
      console.log("Renamed date to news_date in news table.");
    } catch (e) {
      console.log("Column date might not exist, or already renamed.", e.message);
    }

    process.exit(0);
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
}

test();
