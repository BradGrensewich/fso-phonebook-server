const mongoose = require("mongoose");

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log(
    `Should run program  as follows: $node mongo.db <password> personName PersonNumber`,
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fso:${password}@fullstack-course.th3qx.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstack-course`;
const connectToDb = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url);
};
const getPersonModel = () => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  });
  return mongoose.model("Person", personSchema);
};
const saveNewPerson = () => {
  connectToDb();
  const name = process.argv[3];
  const number = process.argv[4];

  const Person = getPersonModel();
  const p = new Person({ name: name, number: number });
  p.save().then(() => {
    console.log(`${p.name} saved to db`);
    mongoose.connection.close();
  });
};

const displayAllPeople = () => {
  connectToDb();
  const Person = getPersonModel();
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((p) => {
      console.log(`${p.name} ${p.number}`);
    });
    mongoose.connection.close();
  });
};
if (process.argv.length === 5) {
  saveNewPerson();
  return;
} else if (process.argv.length === 3) {
  displayAllPeople();
  return;
}
