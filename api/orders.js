import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();

      const order = {
        ...req.body,
        status: "pending",
        createdAt: new Date(),
      };

      const result = await db.collection("orders").insertOne(order);

      res.status(201).json({
        success: true,
        orderId: result.insertedId,
      });
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
