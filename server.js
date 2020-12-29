require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const path = require("path");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
    // serve static content
    app.use(express.static(path.join(__dirname, "client/build")));
}

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {

        // const results = await db.query("SELECT * FROM restaurants");

        const restaurantRatingsData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id");

        res.status(200).json({
            status:"success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);

    try {
        // const restaurant = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1", [req.params.id]);

        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Create a restaurant

app.post("/api/v1/restaurants", async (req, res)=> {
    // console.log(req.body);

    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [req.body.name, req.body.location, req.body.price_range])

        // console.log(results);

        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {

    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err);
    }

});

// Delete a Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {

    try {

        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);

        res.status(204).json({
            status: "success",
        });

    } catch (err) {
        console.log(err);
    }

});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {

    try {

        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [req.params.id, req.body.name, req.body.review, req.body.rating]);

        res.status(201).json({
            status: "success",
            data: newReview.rows[0],
        });

    } catch (err) {
        console.log(err);
    }

});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is up & listening on port ${port}`);
});