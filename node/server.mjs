import express from "express"
import cors from "cors"
import { PrismaClient } from "./generated/prisma/index.js"

const app = express()
const prisma = new PrismaClient()
const { APP_PORT, API_RESULTS, API_TREE } = process.env
const PORT = APP_PORT ?? 3000

app.use(cors())

app.get(API_RESULTS, async (req, res) => {
  const { q, limit, page } = req.query
  const currentLimit = Number(limit ?? 10)
  let currentPage = Math.max(1, Number(page ?? 1))

  try {
    const count = await prisma.issue.count({
      where: {
        url: { startsWith: q, mode: "insensitive" },
      },
    })

    const totalPages = Math.ceil(count / currentLimit)

    currentPage = Math.min(currentPage, totalPages)

    const data = await prisma.issue
      .findMany({
        skip: (currentPage - 1) * currentLimit,
        take: currentLimit,
        where: {
          url: { startsWith: q, mode: "insensitive" },
        },
        select: {
          url: true,
          type: true,
          severity: true,
          component: true,
          selector: true,
        },
      })
      .then((results) =>
        results.reduce(
          (acc, { url, ...options }) => ({
            ...acc,
            [url]: [...(acc[url] || []), options],
          }),
          {},
        ),
      )

    res.status(200).send(
      JSON.stringify({
        data,
        pagination: {
          currentPage,
          total: totalPages,
          limit: currentLimit,
          hasPrevious: currentPage > 1,
          hasNext: currentPage < totalPages,
        },
      }),
    )
  } catch (e) {
    process.exit(1)
  } finally {
    prisma.$disconnect()
  }
})

app.get(API_TREE, async (req, res) => {
  const { q } = req.query

  try {
    const data = await prisma.issue
      .findMany({
        where: {
          url: { contains: q, mode: "insensitive" },
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
