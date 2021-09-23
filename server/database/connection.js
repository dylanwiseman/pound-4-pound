// This file creates the MongoClient used to connect to the database and declares the actual CRUD functions that connect to the database

const { MongoClient } = require("mongodb");
const URI = process.env.URI || require("./config");
const client = new MongoClient(URI);

async function listDatabases(client) {
  let databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

//CREATE:

//client is defined above. We find the database, then the collection, then insert the user object we created and send back result:
async function createUser(newUser) {
  const result = await client
    .db("pound4pound")
    .collection("users")
    .insertOne(newUser);
  console.log(`New user created with the following id: ${result.insertedId}`);
  return result;
}

async function createMultipleListings(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);
  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
}

// READ:

//finding a user by username. If there is no user, we send back a console log that says so:
async function findOneUser(username) {
  const result = await client
    .db("pound4pound")
    .collection("users")
    .findOne({ username: username });
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log(`No users found with the name '${username}'`);
  }
}

//this is used to find all users for the leaderboard:
async function findUsers() {
  console.log("getting users for the leaderboard...");
  const cursor = client
    .db("pound4pound")
    .collection("users")
    .find()
    .sort({ benchPR: -1 });
  const results = await cursor.toArray();
  return results;
}

//UPDTATE:

//used to both update PRs and daily stats array:
async function updateUser(nameOfUser, updatedUser) {
  console.log("updating: ", nameOfUser, " with: ", updatedUser);
  const result = await client
    .db("pound4pound")
    .collection("users")
    .updateOne({ username: nameOfUser }, { $set: updatedUser });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  return result;
}
async function upsertListingByName(client, nameOfListing, updatedListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: updatedListing },
      { upsert: true }
    );
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  if (result.upsertedCount > 0) {
    console.log(
      `One document was inserted with the id ${result.upsertedId._id}`
    );
  } else {
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
  }
}

// DELETE:

async function deleteListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: nameOfListing });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//MAIN FUNCTION:

async function connect() {
  try {
    await client.connect();
    console.log("db connected");
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { connect, findOneUser, createUser, findUsers, updateUser };
