import Hotel from "../models/hotel_model.js";

export const addHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const addedHotel = await newHotel.save();
    res.status(201).json(addedHotel);
  } catch (error) {
    // next(error);
    res.status(500).json(error);
  }
};

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json(error);
    }
    };

export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
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
        