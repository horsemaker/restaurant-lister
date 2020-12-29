import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
// import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';

const UpdateRestaurant = (props) => {

    const {id} = useParams();

    let history = useHistory();

    // const { restaurants } = useContext(RestaurantsContext);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        history.push("/");
    };

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={e => setName(e.target.value)} className="form-control" type="text"/>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input id="location" value={location} onChange={e => setLocation(e.target.value)} className="form-control" type="text"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    {/* <input id="price_range" className="form-control" type="number"/> */}
                    <select id="price_range" value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value="1">₹</option>
                        <option value="2">₹₹</option>
                        <option value="3">₹₹₹</option>
                        <option value="4">₹₹₹₹</option>
                        <option value="5">₹₹₹₹₹</option>
                    </select>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;
