import express from "express"
import cors from "cors"
import { PrismaClient } from "./generated/prisma/index.js"

const app = express()

const PORT = process.env.APP_PORT || 3000

const prisma = new PrismaClient()

app.use(cors())

app.get("/api/v1/results", async (req, res) => {
  try {
    const { q } = req.query

    const data = await prisma.page
      .findMany({
        where: {
          url: { contains: q },
        },
        select: {
          url: true,
          issues: true,
        },
      })
      .then((data) =>
        data.reduce(
          (acc, { url, issues }) => ({
            ...acc,
            [url]: issues,
          }),
          {},
        ),
      )

    res.status(200).send(JSON.stringify({ data }))
  } catch (e) {
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
})

app.get("/api/v1/tree", async (req, res) => {
  try {
    const { q } = req.query

    const data = await prisma.page
      .findMany({
        where: {
          url: { contains: q },
        },
        select: {
          url: true,
          issues: true,
        },
      })
      .then((data) =>
        data.reduce(
          (acc, { url, issues }) => ({ ...acc, [url]: issues.length }),
          {},
        ),
      )

    res.status(200).send(JSON.stringify({ data }))
  } catch (e) {
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
})

app.listen(PORT, () => {
  console.log("Listening to port", PORT)
})
