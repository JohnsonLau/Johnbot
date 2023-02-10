import { config } from "dotenv";
import axios from "axios";
import * as readline from "readline";
//reads .env file by default if there is no params
config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// await will wait for Promise to call "resolve"
// question function doesnt return a promise, so we cannot wait for it (we promisify the question function ourself)
const text = await new Promise((resolve) => {
  rl.question("Enter a discord text: ", (text) => {
    resolve(text);
  });
});

rl.close();

var data = JSON.stringify({
  content: text,
});

var axiosReqConfig = {
  method: "post",
  url: process.env.DISCORD_WEBHOOK,
  headers: {
    "Content-Type": "application/json",
  },
  data: data,
};

try {
  const response = await axios(axiosReqConfig);

  console.log(JSON.stringify(response.data));
} catch (error) {
  console.log(error);
}
