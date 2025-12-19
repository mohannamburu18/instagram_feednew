const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create posts table
      db.run(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          author TEXT NOT NULL,
          caption TEXT NOT NULL,
          image TEXT NOT NULL,
          likes INTEGER DEFAULT 0,
          creator_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating posts table:', err);
          reject(err);
        } else {
          console.log('✓ Posts table created/verified');
          
          // Insert sample data
          db.get('SELECT COUNT(*) as count FROM posts', (err, row) => {
            if (err) {
              reject(err);
            } else if (row.count === 0) {
              const samplePosts = [
                {
                  author: 'travel_explorer',
                  caption: 'Sunset over the mountains 🌄 #nature #beautiful',
                  image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
                },
                {
                  author: 'foodie_dreams',
                  caption: 'Homemade pasta from scratch! 🍝 Recipe in bio',
                  image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800'
                },
                {
                  author: 'fitness_journey',
                  caption: 'Morning workout complete! 💪 #motivation #fitness',
                  image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800'
                },
                {
                  author: 'urban_photographer',
                  caption: 'City lights at night ✨ #cityscape #photography',
                  image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800'
                },
                {
                  author: 'coffee_lover',
                  caption: 'Perfect latte art ☕️ #coffeetime #latteart',
                  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'
                },
                {
                  author: 'adventure_seeker',
                  caption: 'Hiking trails that take your breath away 🥾',
                  image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800'
                },
                {
                  author: 'bookworm_reads',
                  caption: 'Current read: "The Midnight Library" 📚 Highly recommend!',
                  image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
                },
                {
                  author: 'pet_paradise',
                  caption: 'Meet Charlie! The happiest golden retriever 🐕',
                  image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800'
                },
                {
                  author: 'ocean_vibes',
                  caption: 'Beach days are the best days 🌊 #beachlife',
                  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
                },
                {
                  author: 'art_creative',
                  caption: 'Working on my latest watercolor piece 🎨',
                  image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
                },
                {
                  author: 'tech_enthusiast',
                  caption: 'New setup complete! Productivity level 100 💻',
                  image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800'
                },
                {
                  author: 'plant_parent',
                  caption: 'My indoor jungle is growing! 🌿 #plantsofinstagram',
                  image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800'
                }
              ];

              const stmt = db.prepare('INSERT INTO posts (author, caption, image, likes) VALUES (?, ?, ?, ?)');
              
              samplePosts.forEach((post, index) => {
                const randomLikes = Math.floor(Math.random() * 500) + 50;
                stmt.run(post.author, post.caption, post.image, randomLikes);
              });

              stmt.finalize((err) => {
                if (err) {
                  reject(err);
                } else {
                  console.log(`✓ Inserted ${samplePosts.length} sample posts`);
                  resolve();
                }
              });
            } else {
              console.log(`✓ Database already contains ${row.count} posts`);
              resolve();
            }
          });
        }
      });
    });
  });
};

module.exports = { db, initDatabase };
