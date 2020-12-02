/*
Two queries should involve at least two of the following:
> join of multiple relations,
> set operations,
> aggregation via GROUP BY.
*/

/* Find users whose first name starting with "A" 
    with average rating higher than 4.5 */
SELECT userId, firstName, AVG(rating) AS avgRating
FROM Reviews LEFT JOIN Users ON Reviews.userId = Users.userId
WHERE firstName LIKE "A%"
HAVING avgRating > 4.5
GROUP BY Reviews.userId;

/* Find the most popular product in "Video" category. */
SELECT productId, productName, numPurchase
FROM (
    SELECT productId, productName, COUNT(teamId) AS numPurchase
    FROM TeamPurchase NATURAL JOIN Products
    WHERE tag LIKE "%Video%"
    GROUP BY productId
) AS tmp1
WHERE numPurchase IN (
    SELECT MAX(numPurchase) FROM (
        SELECT COUNT(teamId) AS numPurchase
        FROM TeamPurchase NATURAL JOIN Products
        WHERE tag LIKE "%Video%"
        GROUP BY productId
    ) AS tmp2
);

/* Find the top three popular products in "Music" category,
    return productId, company, purchased times,
    sorted in descending order on purchase times. */
SELECT productId, productName, COUNT(teamId) AS numPurchase
FROM TeamPurchase NATURAL JOIN Products
WHERE tag LIKE "%Music%"
GROUP BY productId
ORDER BY numPurchase DESC, productName ASC
LIMIT 3;

-- SELECT productId, COUNT(teamId) AS numPurchase
-- FROM TeamPurchase
-- WHERE tag LIKE "%Music%"
-- GROUP BY productId
-- ORDER BY numPurchase DESC
-- LIMIT 3;