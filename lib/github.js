const GITHUB_API = "https://api.github.com";

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const path = process.env.GITHUB_PRODUCTS_PATH;

  if (!token || !owner || !repo || !path) {
    throw new Error(
      "GitHub environment variables belum lengkap."
    );
  }

  return {
    token,
    owner,
    repo,
    path,
  };
}

async function githubRequest(url, options = {}) {
  const { token } = getConfig();

  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `GitHub API error ${response.status}: ${errorText}`
    );
  }

  return response.json();
}

export async function getProductsFile() {
  const {
    owner,
    repo,
    path,
  } = getConfig();

  const url =
    `${GITHUB_API}/repos/` +
    `${owner}/${repo}/contents/${path}`;

  return githubRequest(url);
}

export async function getProducts() {
  try {
    const file = await getProductsFile();

    const content = Buffer
      .from(file.content, "base64")
      .toString("utf-8");

    return {
      products: JSON.parse(content),
      sha: file.sha,
    };
  } catch (error) {
    console.error("Failed to read products:", error);

    return {
      products: [],
      sha: null,
    };
  }
}

export async function saveProducts(products, sha) {
  const {
    owner,
    repo,
    path,
  } = getConfig();

  const content = JSON.stringify(
    products,
    null,
    2
  );

  const encodedContent = Buffer
    .from(content)
    .toString("base64");

  const url =
    `${GITHUB_API}/repos/` +
    `${owner}/${repo}/contents/${path}`;

  return githubRequest(url, {
    method: "PUT",

    body: JSON.stringify({
      message: "Update NovaWear products",
      content: encodedContent,
      sha,
    }),
  });
}