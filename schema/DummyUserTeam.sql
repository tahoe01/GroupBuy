INSERT INTO Users
(firstName, lastName, email, password, phoneNumber)
VALUES
('John', 'Doe', 'jdoe2@illinois.edu', 'password1', '9788443242');

INSERT INTO Teams
(status, maxGroupSize, initiatorId)
VALUES
('active', 8, 1),
('inactive', 8, 1);

INSERT INTO UserInTeam
(userId, teamId)
VALUES
(1, 1),
(1, 2);

INSERT INTO TeamPurchase
(teamId, productId, purchaseDate)
VALUES
(1, 3,'5/5/13'),
(2, 2, '7/7/12')