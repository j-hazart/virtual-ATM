const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * The function checks if a given field value is already used in a specific model in a database.
 * @param model - The "model" parameter refers to the name of the model or table in the database that
 * you want to check for the existence of a specific field value. It is used to specify the model or
 * table where the field is located.
 * @param fieldName - The `fieldName` parameter is the name of the field in the `model` that you want
 * to check if the `value` is already used in the database.
 * @param value - The `value` parameter represents the value that you want to check if it is already
 * used in the database.
 * @returns The function isFieldValueUsed returns a boolean value. It returns true if the value is
 * already used in the specified field of the model in the database, and false if the value is not
 * used.
 */
async function isFieldValueUsed(model, fieldName, value) {
  // Vérifier si la value existe déjà dans la base de données
  const existingModel = await prisma[model].findUnique({
    where: {
      [fieldName]: value,
    },
  });

  // Si existingModel est null, cela signifie que la value n'est pas utilisé
  // Sinon, la value est déjà utilisé
  return existingModel !== null;
}

/**
 * The function generates a unique field value for a given model and field name by generating a random
 * number within a specified range and checking if it is already used.
 * @param model - The `model` parameter represents the name of the model or entity for which you want
 * to generate a unique field value. It could be a string representing the name of the model, such as
 * "user", "product", or "order".
 * @param fieldName - The `fieldName` parameter is the name of the field in the model for which you
 * want to generate a unique value.
 * @returns a unique value for the specified field name in the given model.
 */
async function generateUniqueFieldValue(model, fieldName) {
  const min = model === "user" ? 10000000000 : 1000000000000000;
  const max = model === "user" ? 99999999999 : 9999999999999999;
  let value = String(Math.floor(Math.random() * (max - min + 1)) + min);

  // Tant que la value généré est déjà utilisé, regénérez-le
  while (await isFieldValueUsed(model, fieldName, value)) {
    value = String(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return value;
}

/**
 * The function generates unique field values for a given data array, model, field name, minimum value,
 * and maximum value.
 * @param data - An array of objects representing the data you want to update with unique field values.
 * @param model - The `model` parameter refers to the model or schema that represents the data
 * structure in your application. It is used to interact with the database and perform operations such
 * as querying and updating data.
 * @param fieldName - The `fieldName` parameter is the name of the field in the `data` array that you
 * want to generate unique values for.
 * @param min - The `min` parameter represents the minimum value that the generated unique field value
 * can have.
 * @param max - The `max` parameter represents the maximum value that the generated unique field value
 * can have.
 * @returns The function `generateUniqueFieldValues` returns a Promise that resolves to the updated
 * data array with unique field values.
 */
const generateUniqueFieldValues = async (data, model, fieldName) => {
  const updatedData = await Promise.all(
    data.map(async (element) => {
      const value = await generateUniqueFieldValue(model, fieldName);
      element[fieldName] = value;
      return element;
    })
  );

  return updatedData;
};

module.exports = {
  generateUniqueFieldValues,
};
