import app from "./app.js";
import connectToDatabase from "./db/connection.js";
//connections and listeners
connectToDatabase().then(() => {
    app.listen(3004, () => console.log("Server opened and connected to database")); //() Callback function
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map