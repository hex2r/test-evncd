import type { ResponseTreeData, Tree } from "../types"
import getIssuesCount from "./getIssuesCount"

export default function transformDataToTree(
  data: Record<string, number>,
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
}: {
  acc: Tree
  url: string
  pathname: string
  treePath: string
  data: Record<string, number>
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
      })
    }

    return {
      ...acc,
      [`${url}/${currentPathLabel}`]: {
        label: currentPathLabel,
        path: `${treePath}/${currentPathLabel}`,
        issuesCount: getIssuesCount(`${url}/${currentPathLabel}`, data),
        ...(nextPathname.length > 0
          ? {
              children:
                buildTree({
                  acc: acc[`${url}/${currentPathLabel}`]?.children || {},
                  url: `${url}/${currentPathLabel}`,
                  pathname: nextPathname,
                  treePath: `${treePath}/${currentPathLabel}`,
                  data,
                }) || {},
            }
          : {}),
      },
    }
  }

  return acc
}
