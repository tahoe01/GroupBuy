INSERT INTO Products
(productName, company, price, link, tag, `description`) 
VALUES
('Apple Music Family Plan', 'Apple', 14.99, 'https://www.apple.com/apple-music/#:~:text=Cancel%20anytime.-,Apple%20Music%20is%20available%20in%20iTunes,for%20iOS%20and%20Android%20devices.&text=%244.99%2Fmo.&text=%249.99%2Fmo.&text=%2414.99%2Fmo.',
 'Music,Entertainment', 'Access for up to 6 people. A personal account for each family member. Free trial for 3 months. Down to $2.5/month for each person after!'),

('Spotify Premium Family', 'Spotify', 14.99, 'https://www.spotify.com/us/family/', 
 'Music,Entertainment', 'Access for up to 6 Premium accounts. Try 1 month free. Down to $2.5/month for each person after!'),

('YouTube Premium Family', 'YouTube', 17.99, 'https://www.youtube.com/premium', 
 'Music,Video,Entertainment', 'YouTube and YouTube Music ad-free, offline, and in the background. Up to 5 family members. 1-month free trial. Down to $3.6/month for each person after.'),

('Netflix Premium', 'Netflix', 17.99, 'https://www.netflix.com/signup/planform',
 'Video,Entertainment', 'Access for up to 4 devices. Best video quality and 4k + HDR resolution.'),

('Microsoft 365 Family', 'Microsoft', 9.99, 'https://www.microsoft.com/en-us/microsoft-365/p/microsoft-365-family/cfq7ttc0k5dm?activetab=pivot:overviewtab', 
 'Office,Tools,Technology', 'For PC, Mac, iOS, and Android. For up to 6 people. 1TB cloud storage for each person. One-month free traial. $99.99/year down to $16.67/year for each person. Or $9.99/month down to $1.67/month for each person.'),

('McAfee AntiVirus Unlimited', 'McAfee', 29.99, 'https://www.mcafee.com/en-us/for-home.html',
 'Security,Technology', 'Up to 10 devices. $29.99/year for 2-Year subscription. Protect against viruses, malware and online threats.');
INSERT INTO Users VALUES(1, "Dayue", "Bai", "dayueb2@illinois.edu", "gryffindor", 12345678); 
INSERT INTO Reviews VALUES (2, 1, 1, 2, 6, 'Test Review 2');