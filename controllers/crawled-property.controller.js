const {
  CrawledProperty,
  ApproveCrawledProperty,
  ListHouse,
} = require("../models");

exports.getAllProperty = async (req, res) => {
  try {
    let results = await CrawledProperty.findAll({
      offset: req.body.start,
      limit: 20,
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};
exports.searchProperty = async (req, res) => {
  try {
    let results = await CrawledProperty.findAll({
      where: { title: req.body.searchItem?.toLowerCase() },
    });
    return res.json(results);
  } catch (error) {
    return res.status(500).json({ error, message: "error occur" });
  }
};

exports.approveProperty = async (req, res) => {
  const {
    user_id,
    property_id,
    property_amount,
    monthly_payment,
    duration,
    upfront,
  } = req.body;
  try {
    let checkUser = await ApproveCrawledProperty.findOne({
      where: { property_id },
    });
    if (checkUser === null)
      await ApproveCrawledProperty.create({
        se_id: null,
        bm_id: null,
        manager_id: null,
        property_id,
        date: null,
        is_approved: "-2",
      });
    const ch = await ApproveCrawledProperty.findOne({
      where: { property_id },
    });
    if (ch.is_approved === "-2") {
      await ApproveCrawledProperty.update(
        {
          se_id: user_id,
          is_approved: "-1",
          property_amount,
          monthly_payment,
          duration,
          upfront,
          date: Date.now(),
        },
        { where: { property_id } }
      );
      await CrawledProperty.update(
        { is_approved: "-1" },
        { where: { id: property_id } }
      );
      let property = await CrawledProperty.findOne({
        where: { id: property_id },
      });
      return res.json({ result: "-1", property });
    } else if (ch.is_approved === "-1") {
      await ApproveCrawledProperty.update(
        { is_approved: "0", bm_id: user_id },
        { where: { property_id } }
      );
      await CrawledProperty.update(
        { is_approved: "0" },
        { where: { id: property_id } }
      );
      let property = await CrawledProperty.findOne({
        where: { id: property_id },
      });
      return res.json({ result: "0", property });
    } else if (ch?.is_approved == "0") {
      await ApproveCrawledProperty.update(
        { is_approved: "1", manager_id: user_id },
        { where: { property_id } }
      );
      await CrawledProperty.update(
        { is_approved: "1" },
        { where: { id: property_id } }
      );
      let property = await CrawledProperty.findOne({
        where: { id: property_id },
      });
      return res.json({ result: "1", property });
    } else if (ch?.is_approved === "1") {
      let {
        title,
        price,
        image,
        description,
        address,
        beds,
        baths,
        toilets,
        agent_phone,
      } = await CrawledProperty.findOne({
        where: { id: property_id },
      });
      let jk = await ApproveCrawledProperty.findOne({
        where: { property_id },
      });
      let saveData = {
        date_added: jk.date,
        address,
        rent_amount: price,
        rooms: beds,
        bathrooms: baths,
        toilet: toilets,
        picture: image,
        house_category: title,
        house_description: description,
        phone: agent_phone,
        is_approved: "-1",
      };

      await ListHouse.create(saveData);

      let property = await CrawledProperty.findOne({
        where: { id: property_id },
      });

      return res.json({ result: "done", property });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "error occur" });
  }
};
