import { where } from "sequelize";
import db from "../models/index";

const readFunc = async (req, res) => {
  try {
    let { page, limit, user_id } = req.query
    let data
    if (page && limit) {
      let { page, limit } = req.query;
      let offset = (page - 1) * limit;
      let { count, rows } = await db.Address.findAndCountAll({
        where: { user_id: user_id },
        offset: offset,
        limit: limit,
        attributes: ["id", "user_id", "name","house_address", "ward", "district", "city", "phone_number", "default", "updatedAt", "createdAt"],
        order: [["user_id", "ASC"]],
      })
      const totalPages = Math.ceil(count / limit);
      data = { totalRows: count, totalPages: totalPages, address: rows, }
    } else {
      data = await db.Address.findAll({
        where: { user_id: user_id },
        attributes: ["id", "user_id", "name","house_address", "ward", "district", "city", "phone_number", "default", "updatedAt", "createdAt"],
      })
    }
    return res.status(200).json({ message: "get address success", code: 0, data: data, });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const createFunc = async (req, res) => {
  try {
    const { user_id, full_address, street_name, ward, district, province, country, phone_number } = req.body.data;
    if (!user_id || !full_address || !street_name || !ward || !district || !province || !country || !phone_number) return res.status(200).json({ message: "missing required parameters", code: 1 });
    let data = await db.Address.create({ user_id: user_id, full_address: full_address, street_name: street_name, ward: ward, district: district, province: province, country: country, phone_number: phone_number });
    return res.status(200).json({ message: "a address is created successfully", code: 0, data: data });
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const updateFunc = async (req, res) => {
  try {
    let data = req?.body?.data
    let address = await db.Address.findOne({ where: { id: data?.id, }, });
    if (address) {
      await address.update({ user_id: data.user_id, full_address: data.full_address, street_name: data.street_name, ward: data.ward, district: data.district, province: data.province, country: data.country, phone_number: data.phone_number });
      return res.status(200).json({ message: "update address success", code: 0 });
    } else {
      return res.status(200).json({ message: "address not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

const deleteFunc = async (req, res) => {
  try {
    let { id } = req.body;
    let address = await db.Address.findOne({ where: { id: id, }, });
    if (address) {
      await address.destroy();
      return res.status(200).json({ message: "delete address success", code: 0 });
    } else {
      return res.status(200).json({ message: "address not exist", code: 1 });
    }
  } catch (error) {
    return res.status(500).json({ message: "error from server", code: -1 });
  }
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc };
