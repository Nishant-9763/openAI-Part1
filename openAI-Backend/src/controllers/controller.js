const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const generateImage = async function(req,res){
    try {
        const {prompt,size} = req.body

        const imageSize = size == 'small' ? '256x256' : size == 'medium' ? '512x512' :  '1024x1024'

        const response = await openai.createImage({
            prompt,
            n: 1,
            size:imageSize
        })

        const imageUrl = response.data.data[0].url

        res.status(200).send({
            status :true,
            data : imageUrl
        })

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }
        res.status(400).send({
            status :false,
            error : error.message
        })
    }
}

module.exports = {generateImage}