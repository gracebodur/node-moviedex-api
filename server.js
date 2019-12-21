const app = require("./app");
const PORT = process.env.PORT || 8000;

app.listen(PORT),
  () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  };
  3161b12a-bea6-41fd-8396-57e24d470473