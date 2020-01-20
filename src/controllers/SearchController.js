const Dev = require('../models/Dev');

class SearchController{
    async index(req,res){
        //search all devs in 10 km 
        //for techs 
        const {techs,latitude,longitude} = req.query;
        const techsArray = techs.split(',').map(tech=>tech.trim());
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                        $maxDistance: 10000
                    }
                }
            }
        });
        return res.json({devs});;
    }
}

module.exports = new SearchController();