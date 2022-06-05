import Hotel from "../models/hotel_model.js";

export const addHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const addedHotel = await newHotel.save();
    cache.del("cities");
    res.status(201).json(addedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
    if (!hotels) {
      return res.status(404).json({ message: "No hotels found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json("Hotel has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelsByName = async (req, res) => {
  try {
    const hotel = await Hotel.find({
      name: req.params.name,
    });
    if (hotel.length === 0) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getHotelByCity = async (req, res) => {
  try {
    const hotel = await Hotel.find({
      city: req.params.city,
    });
    if (hotel.length === 0) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCities = async (req, res) => {
  try {
    const cacheCities = await cache.get("cities");

    if (cacheCities !== null) {
      return res.status(200).json(JSON.parse(cacheCities));
    }
    const cities = await Hotel.distinct("city");
    try {
      await cache.set("cities", JSON.stringify(cities));
      cache.expire("cities", 7200);
    } catch (error) {
      console.log(error);
    }
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json(error);
  }
};
