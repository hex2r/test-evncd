import express from "express"
import cors from "cors"
import { PrismaClient } from "./generated/prisma/index.js"

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.APP_PORT || 3000

app.use(cors())

app.get("/api/v1/results", async (req, res) => {
  try {
    const { q, limit, page } = req.query
    const currentLimit = Number(limit || 10)
    const currentPage = Math.max(1, Number(page || 1))

    const [issuesCount, data] = await prisma
      .$transaction([
        prisma.issue.count({
          where: {
            url: { contains: q },
          },
        }),
        prisma.issue.findMany({
          skip: (currentPage - 1) * currentLimit,
          take: currentLimit,
          where: {
            url: { contains: q, mode: "insensitive" },
          },
          select: {
            url: true,
            type: true,
            severity: true,
            component: true,
            selector: true,
          },
        }),
      ])
      .then(([issuesCount, results]) => [
        issuesCount,
        results.reduce(
          (acc, { url, ...options }) => ({
            ...acc,
            [url]: [...(acc[url] || []), options],
          }),
          {},
        ),
      ])

    res.status(200).send(
      JSON.stringify({
        data,
        pagination: {
          currentPage,
          total: Math.ceil(issuesCount / currentLimit),
          limit: currentLimit,
          hasPrevious: currentPage > 1,
          hasNext: currentPage < Math.ceil(issuesCount / currentLimit),
        },
      }),
    )
  } catch (e) {
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
})

app.get("/api/v1/tree", async (req, res) => {
  try {
    const { q } = req.query

    const data = await prisma.issue
      .findMany({
        where: {
          url: { contains: q },
        },
        select: {
          url: true,
        },
      })
      .then((results) =>
        Object.values(results).reduce(
          (acc, { url }) => ({
            ...acc,
            [url]: url in acc ? acc[url] + 1 : 1,
          }),
          {},
        ),
      )

    res.status(200).send(JSON.stringify({ ...data }))
  } catch (e) {
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
})

app.listen(PORT, () => {
  console.log("Listening to port", PORT)
})
