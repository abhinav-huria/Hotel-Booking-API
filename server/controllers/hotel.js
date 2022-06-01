import Hotel from "../models/hotel_model.js";

export const addHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const addedHotel = await newHotel.save();
    res.status(201).json(addedHotel);
  } catch (error) {
    // next(error);
    console.log(error);
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
        
export const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (error) {
        res.status(500).json(error);
    }
    };

    export const getHotelByName = async (req, res) => {
        try {
            const hotel = await Hotel.findOne({
                name: req.params.name
            });
            res.status(200).json(hotel);
        } catch (error) {
            res.status(500).json(error);
        }
        };

        export const getHotelByCity = async (req, res) => {
           console.log(req.params.city);
            try {
                const hotel = await Hotel.find({
                    city: req.params.city
                });
                res.status(200).json(hotel);
            } catch (error) {
                res.status(500).json(error);
            }
            

            };

            export const getCities = async (req, res) => {
                try {
                 const cacheCities = await cache.get("cities");
              cache.del("cities");
                    if (cacheCities!==null) {
                        console.log("cache hit");
                       return res.status(200).json(JSON.parse(cacheCities));
                    } else {
                        console.log("cache not found");
                    }
                   const cities = await Hotel.distinct("city");
                   try{
                     await cache.set("cities", JSON.stringify(cities));
                     cache.expire("cities", 7200);
                   }
                     catch(error){
                         console.log(error);    
                        }
               res.status(200).json(cities);
                } catch (error) {
                    res.status(500).json(error);
                }
                };
