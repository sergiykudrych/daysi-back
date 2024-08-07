const ImageModel = require('../models/image-model');

class ImageControllers {
  async uploadImage(req, res, next) {
    try {
      const { img } = req.body;

      if (!img) {
        return res.status(400).send('No image provided.');
      }

      const image = new ImageModel({
        image: img,
      });
      const result = await image.save();
      res.send({
        message: 'Файл успішно завантажено',
        success: true,
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async getImages(req, res, next) {
    console.log(req);
    try {
      const images = await ImageModel.find();
      res.send(images);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}
module.exports = new ImageControllers();
