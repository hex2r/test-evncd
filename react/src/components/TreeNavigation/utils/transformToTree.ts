import type { Tree } from "../types"
import getIssuesCount from "./getIssuesCount"

export default function transformDataToTree(
  data: Record<string, number>,
  query: string,
): Tree {
  return (Object.entries(data) as [string, number][]).reduce((acc, [url]) => {
    const urlObject = new URL(url)
    const hasOrigin = urlObject.origin in acc

    // Note: Support multi-origin
    if (!hasOrigin) {
      acc = {
        ...acc,
        [urlObject.origin]: {
          path: "/root",
          label: "root",
          children: {},
          origin: urlObject.origin,
          isExpanded: true,
        },
      }
    }

    return {
      ...acc,
      [urlObject.origin]: {
        ...acc[urlObject.origin],
        children: buildTree({
          acc: acc[urlObject.origin].children || {},
          treePath: "/root",
          url: urlObject.origin,
          pathname: urlObject.pathname,
          data,
          query,
        }),
      },
    }
  }, {} as Tree)
}

function buildTree({
  url,
  pathname,
  treePath,
  acc,
  data,
  query,
}: {
  acc: Tree
  url: string
  pathname: string
  treePath: string
  data: Record<string, number>
  query: string
}): Tree | undefined {
  const splittedPathname = pathname.split("/")

  if (splittedPathname.length > 0) {
    const currentPathLabel = splittedPathname[0]
    const splittedNextPathname = splittedPathname.slice(
      1,
      splittedPathname.length,
    )
    const nextPathname = splittedNextPathname.join("/")

    if (!currentPathLabel) {
      return buildTree({
        acc,
        url,
        pathname: nextPathname,
        treePath,
        data,
        query,
      })
    }

    return {
      ...acc,
      [`${url}/${currentPathLabel}`]: {
        label: currentPathLabel,
        path: `${treePath}/${currentPathLabel}`,
        issuesCount: getIssuesCount(`${url}/${currentPathLabel}`, data),
        isExpanded: query.startsWith(`${url}/${currentPathLabel}`),
        ...(nextPathname.length > 0
          ? {
              children:
                buildTree({
                  acc: acc[`${url}/${currentPathLabel}`]?.children || {},
                  url: `${url}/${currentPathLabel}`,
                  pathname: nextPathname,
                  treePath: `${treePath}/${currentPathLabel}`,
                  data,
                  query,
                }) || {},
            }
          : {}),
      },
    }
  }

  return acc
}
