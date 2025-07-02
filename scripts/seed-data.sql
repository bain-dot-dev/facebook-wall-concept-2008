-- Insert sample posts with programming pun jokes
insert into posts (user_name, body, created_at) values
  ('Anna', 'Hey Bain, did your coffee maker throw a Java exception? Because that last brew had stack traces.', now() - interval '2 hours'),
  ('Adelaida', 'Bain, your last commit caused Stack Overflow to actually stack overflow. That’s talent!', now() - interval '3 hours'),
  ('Juho', 'Bain, still debugging in pajamas or did you finally push those sweatpants to production?', now() - interval '4 hours'),
  ('Maija', 'Rumor has it your laptop runs on stickers, not RAM. Is that your new memory management strategy?', now() - interval '5 hours'),
  ('Alex', 'Just did a code sprint without sleep—turns out infinite loops aren’t great bedtime stories.', now() - interval '6 hours'),
  ('Sheryl', 'When are we deploying your dance moves? They’ve passed QA: Quirky and Agile!', now() - interval '8 hours'),
  ('Carlo', 'Bain, your code is so clean, even Git refuses to diff it. Respect.', now() - interval '9 hours'),
  ('Dani', 'Did your terminal crash or are you just ignoring my pings like a 404 error?', now() - interval '10 hours'),
  ('Ella', 'Bain, your functions have more callbacks than my last three exes combined.', now() - interval '11 hours'),
  ('Leo', 'That last bug you squashed screamed like it was written in Perl.', now() - interval '12 hours'),
  ('Miko', 'Heard you refactored a legacy app and lived to tell the tale. Hero or myth?', now() - interval '13 hours'),
  ('Noah', 'Bain, your CSS skills are so slick, even flexbox respects your boundaries.', now() - interval '14 hours'),
  ('Ivy', 'When you said you were in a “committed relationship,” I didn’t realize you meant Git.', now() - interval '15 hours'),
  ('Ravi', 'Your latest deployment was smoother than a semicolon in JavaScript—wait, that’s risky.', now() - interval '16 hours'),
  ('Bea', 'Are you a backend dev? Because I can’t see what you’re doing, but everything just works.', now() - interval '17 hours'),
  ('Toni', 'Even your bugs have comments explaining why they exist. Legendary.', now() - interval '18 hours');
