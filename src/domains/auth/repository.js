import Usuario from "#domains/usuarios/model.js";

/**
 * 🔍 Busca un usuario por su email.
 * Usado en login y registro.
 */
export const findByEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};


/**
 * 🔁 Busca un usuario por ID (por ejemplo, para refresh o validación de token).
 */
export const findById = async (id) => {
  return await Usuario.findByPk(id);
};
