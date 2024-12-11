const mongoose = require('mongoose');
const Code = require('./models/Code');
require('dotenv').config();

const seedCodes = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const codes = [
    { code: '12345', isActive: true },
    { code: 'ABCDE', isActive: true },
    { code: '98765', isActive: true },
    { code: 'XYZ12', isActive: true },
  ];

  try {
    await Code.insertMany(codes);
    console.log('Codes seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding codes:', err);
    process.exit(1);
  }
};

seedCodes();
