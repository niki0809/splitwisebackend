const mongoose = require("mongoose")


const connectDB = async (uri) => {
try {
await mongoose.connect(uri, {
});
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};
// const connectDb=(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
module.exports = connectDB;