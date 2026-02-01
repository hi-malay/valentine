const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const GITHUB_USERNAME = "hi-malay";

export const author = {
  name: "Malay Mishra",
  email: "hi.malay879@gmail.com",
} as const;

export const API = {
  file: (filename: string) =>
    `repos/${GITHUB_USERNAME}/portfolio-data/contents/${filename}`,
};

export const gitFetcher = async <T>(
  method: string,
  route: string,
  body?: object,
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const req = await fetch(`https://api.github.com/${route}`, options);
  if (!req.ok) {
    const errorText = await req.text();
    console.error(
      `gitFetcher error: ${req.status} ${req.statusText}`,
      errorText,
    );
    throw new Error(`GitHub API error: ${req.status} ${req.statusText}`);
  }

  return (await req.json()) as T;
};
