import Cliente from "./model.js";
import { Op } from "sequelize";

export const findAll = async ({ empresaId, offset, limit, search }) => {
  const where = { empresaId };

  if (search) {
    where[Op.or] = [
      { nombre: { [Op.like]: `%${search}%` } },
      { documento: { [Op.like]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Cliente.findAndCountAll({
    where,
    offset,
    limit,
    order: [["id", "ASC"]],
  });

  return {
    data: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(offset / limit) + 1,
  };
};


export const create = (data) => Cliente.create(data);
