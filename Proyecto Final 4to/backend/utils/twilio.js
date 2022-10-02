import twilio from "twilio";
import dotenv from "dotenv";


async function sendSMS() {
  dotenv.config();
  
  const client = twilio(process.env.SID, process.env.TOKEN);
  try {
    const message = {
      body: "Pedido",
      from: "+18507712325",
      to: process.argv[2],
    };
    const response = await client.messages.create(message);
    console.log("SMS=>", response);
  } catch (error) {
    console.log(error);
  }
  sendWP();
}

// sendSMS();

async function sendWP(pedido) {
  try {
    dotenv.config();
  
    const client = twilio(process.env.SID, process.env.TOKEN);
    const message = {
      body: "Pedido",
      from: "whatsapp:+14155238886",
      to: `whatsapp:+${pedido.telefono}`,
      mediaUrl: [
        "https://media.gettyimages.com/photos/portrait-of-two-young-man-at-the-rooftop-picture-id1351219137?s=2048x2048",
      ],
    };
    const response = await client.messages.create(message);
    console.log("Whatsapp=>", response);
  } catch (error) {
    console.log(error);
  }
  sendWP();
}

export default {sendWP,sendSMS}


