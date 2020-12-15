-- Creating 'restaurants' table in yelp.
CREATE TABLE restaurants ( 
    id BIGSERIAL NOT NULL PRIMARY KEY, -- NOT NULL is a constraint.
    name VARCHAR(50) NOT NULL, 
    location VARCHAR(50) NOT NULL, 
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);

-- commands to help => \d , \l

-- Creating 'reviews' table in yelp
CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check( rating >=1 and rating <=5 )
);

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (9, 'Samargeet', 'Yes', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (9, 'Aditya Mahak', 'Mai to so raha tha', 5);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (9, 'Jack', 'Mai to ro raha tha', 1);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (8, 'Pappya', 'Bara Ka', 4);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (8, 'Peti', 'Priority Null', 1);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (10, 'Pappu', 'Paisa Hi Paisa Hoga', 5);
INSERT INTO reviews (restaurant_id, name, review, rating) VALUES (13, 'Jexus', 'Lamb Lamb Lamb Lamb', 5);


--  9 | Samargeet    | Yes                      |      4
--  9 | Aditya Mahak | Mai to so raha tha       |      5
--  9 | Jack         | Mai to ro raha tha       |      1
--  8 | Pappya       | Bara Ka                  |      4
--  8 | Peti         | Priority Null            |      1
-- 10 | Pappu        | Paisa Hi Paisa Hoga      |      5
-- 13 | Jexus        | Lamb Lamb Lamb Lamb Lamb |      5