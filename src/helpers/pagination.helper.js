import { Op } from "sequelize";

const countRecords = async (model, condition = {}) => {
  try {
    const count = await model.count({ where: condition });
    return count;
  } catch (error) {
    throw error;
  }
};

const fetchRecords = async (
  model,
  {
    condition = {},
    orderBy = "createdAt",
    order = "DESC",
    pageSize = 10,
    page = 1,
  }
) => {
  try {
    const records = await model.findAll({
      where: condition,
      order: [[orderBy, order]],
      limit: pageSize,
      offset: (parseInt(page) - 1) * pageSize,
    });
    return records;
  } catch (error) {
    throw error;
  }
};

export { countRecords, fetchRecords };
