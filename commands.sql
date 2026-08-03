CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  url TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (title, author, url) VALUES ( "How to crochet", "Roxie Mayn", "example.com/544");
INSERT INTO blogs (title, author, url) VALUES ( "How to bake a cake", "Emori Hunter", "example.com/6890");