const app = require("./src/app");
const { sequelize } = require("./sql/models");

const { PORT } = process.env;

async function assertDatabaseConnectionOk() {
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
  console.log(`Starting Sequelize + Express example on port ${PORT}...`);
  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}.`);
  });
}

init();
