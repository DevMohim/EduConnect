import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI;

if(!uri){
   console.log('MongoDB uri not found!')
}

const client = new MongoClient(uri as string);
const db = client.db(`${process.env.DB_NAME}`);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [`${process.env.BETTER_AUTH_URL}`],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        defaultValue: "student"
      },
    },
  },
});
