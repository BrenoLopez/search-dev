 const api = require('../services/api');
 const Dev = require('../models/Dev');
 class DevController {
     async store(req, res) {
         const {
             github_username,
             techs,
             latitude,
             longitude
         } = req.body;
      
         let dev = await Dev.findOne({github_username});
         if(!dev){
            const apiResponse = await api.get(`users/${github_username}`);

            //sacada bacana pra pegar login caso o name nao exista
            let {
                name = login, avatar_url, bio
            } = apiResponse.data;
   
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs,
                location
            });
            return res.json(dev);
         } 
         else       
          return res.status(204);
         
     }
     async index(req,res){
        const devs = await Dev.find();
        return res.json(devs);
     }
   
 }

 module.exports = new DevController();