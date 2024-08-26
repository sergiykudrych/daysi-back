const InfoModel = require('../models/info-model');

class InfoControllers {
  async addInfo(req, res, next) {
    try {
      const candidate = await InfoModel.findOne();
      if (candidate) {
        return;
      }
      const info = new InfoModel({
        info: req.body.info,
        price: req.body.price,
      });
      const result = await info.save();
      res.send(result);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async getInfo(req, res, next) {
    try {
      const info = await InfoModel.findOne();
      res.send(info);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

  async updateInfo(req, res, next) {
    try {
      const info = await InfoModel.findOne();
      info.info = req.body.info;
      await info.save();
      res.send(info);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
  async updatePrice(req, res, next) {
    try {
      const info = await InfoModel.findOne();
      info.price = JSON.stringify(req.body.price, null, 2);
      const result = await info.save();
      res.send(result);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
}
module.exports = new InfoControllers();
