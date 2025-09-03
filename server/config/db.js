const mongoose = require("mongoose");
exports.connect = () => {
      mongoose
            .connect(process.env.DB_URL)
            .then(() => console.log("Database connected"))
            .catch((error) => {
                  console.log(error.message);
                  process.exit(1);
            });
};
