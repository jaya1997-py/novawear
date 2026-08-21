import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";

function getHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

/*
|--------------------------------------------------------------------------
| GET PRODUCTS
|--------------------------------------------------------------------------
*/

export async function GET() {
  try {
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch =
      process.env.GITHUB_BRANCH || "main";

    if (
      !owner ||
      !repo ||
      !process.env.GITHUB_TOKEN
    ) {
      return NextResponse.json(
        {
          error:
            "Konfigurasi GitHub belum lengkap.",
        },
        {
          status: 500,
        }
      );
    }

    const url =
      `${GITHUB_API}/repos/${owner}/${repo}/contents/data/products.json?ref=${branch}`;

    const response = await fetch(url, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();

      console.error(
        "GET PRODUCTS GITHUB ERROR:",
        response.status,
        error
      );

      return NextResponse.json(
        {
          error:
            "Gagal membaca products.json.",
        },
        {
          status: response.status,
        }
      );
    }

    const file = await response.json();

    const content = Buffer.from(
      file.content,
      "base64"
    ).toString("utf-8");

    const products = JSON.parse(content);

    /*
    |--------------------------------------------------------------------------
    | NORMALISASI IMAGE URL
    |--------------------------------------------------------------------------
    |
    | Produk lama:
    | /images/products/namafile.jpg
    |
    | Diubah menjadi:
    | https://raw.githubusercontent.com/owner/repo/main/public/images/products/namafile.jpg
    |
    */

    const normalizedProducts = products.map(
      (product) => {
        let image = product.image || "";

        if (
          image &&
          image.startsWith(
            "/images/products/"
          )
        ) {
          image =
            `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public${image}`;
        }

        return {
          ...product,
          image,
        };
      }
    );

    console.log(
      "PRODUCT IMAGES:",
      normalizedProducts.map(
        (product) => product.image
      )
    );

    return NextResponse.json({
      products: normalizedProducts,
    });
  } catch (error) {
    console.error(
      "GET PRODUCTS ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST PRODUCT
|--------------------------------------------------------------------------
*/

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      price,
      category,
      stock,
      description,
      image,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !name ||
      !price ||
      !category ||
      stock === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Nama, harga, kategori dan stock wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const branch =
      process.env.GITHUB_BRANCH || "main";

    const token = process.env.GITHUB_TOKEN;

    if (!owner || !repo || !token) {
      return NextResponse.json(
        {
          error: "Konfigurasi GitHub belum lengkap.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT ID
    |--------------------------------------------------------------------------
    */

    const productId = `nw-${Date.now()}`;

    /*
    |--------------------------------------------------------------------------
    | IMAGE UPLOAD
    |--------------------------------------------------------------------------
    */

    let imagePath = "";

    if (image) {
      const match = image.match(
        /^data:(image\/jpeg|image\/png|image\/webp);base64,(.+)$/
      );

      if (!match) {
        return NextResponse.json(
          {
            error:
              "Format gambar tidak valid. Gunakan JPG, PNG, atau WEBP.",
          },
          {
            status: 400,
          }
        );
      }

      const mimeType = match[1];
      const base64Data = match[2];

      /*
      |--------------------------------------------------------------------------
      | IMAGE EXTENSION
      |--------------------------------------------------------------------------
      */

      let extension = "jpg";

      if (mimeType === "image/png") {
        extension = "png";
      }

      if (mimeType === "image/webp") {
        extension = "webp";
      }

      /*
      |--------------------------------------------------------------------------
      | SAFE FILE NAME
      |--------------------------------------------------------------------------
      */

      const safeName = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const fileName =
        `${productId}-${safeName}.${extension}`;

      /*
      |--------------------------------------------------------------------------
      | GITHUB UPLOAD URL
      |--------------------------------------------------------------------------
      */

      const imageUrl =
        `${GITHUB_API}/repos/${owner}/${repo}/contents/public/images/products/${fileName}`;

      console.log(
        "Uploading image:",
        fileName
      );

      const imageResponse = await fetch(
        imageUrl,
        {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({
            message:
              `Add product image: ${name}`,
            content: base64Data,
            branch,
          }),
        }
      );

      if (!imageResponse.ok) {
        const error =
          await imageResponse.text();

        console.error(
          "GITHUB IMAGE UPLOAD STATUS:",
          imageResponse.status
        );

        console.error(
          "GITHUB IMAGE UPLOAD ERROR:",
          error
        );

        return NextResponse.json(
          {
            error:
              "GitHub menolak upload gambar.",
            githubStatus:
              imageResponse.status,
          },
          {
            status: 500,
          }
        );
      }

      /*
      |--------------------------------------------------------------------------
      | SAVE RAW GITHUB IMAGE URL
      |--------------------------------------------------------------------------
      */

      imagePath =
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/images/products/${fileName}`;

      console.log(
        "Image uploaded successfully:",
        imagePath
      );
    }

    /*
    |--------------------------------------------------------------------------
    | GET PRODUCTS.JSON
    |--------------------------------------------------------------------------
    */

    const productsUrl =
      `${GITHUB_API}/repos/${owner}/${repo}/contents/data/products.json?ref=${branch}`;

    const productsResponse = await fetch(
      productsUrl,
      {
        headers: getHeaders(),
        cache: "no-store",
      }
    );

    let products = [];
    let sha = null;

    if (productsResponse.ok) {
      const file =
        await productsResponse.json();

      sha = file.sha;

      const content = Buffer.from(
        file.content,
        "base64"
      ).toString("utf-8");

      products = JSON.parse(content);
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT
    |--------------------------------------------------------------------------
    */

    const product = {
      id: productId,
      name: name.trim(),
      price: Number(price),
      category,
      stock: Number(stock),
      description:
        description?.trim() || "",
      image: imagePath,
      createdAt:
        new Date().toISOString(),
    };

    products.push(product);

    /*
    |--------------------------------------------------------------------------
    | SAVE PRODUCTS.JSON
    |--------------------------------------------------------------------------
    */

    const newContent = Buffer.from(
      JSON.stringify(
        products,
        null,
        2
      )
    ).toString("base64");

    const githubBody = {
      message:
        `Add product: ${product.name}`,
      content: newContent,
      branch,
    };

    if (sha) {
      githubBody.sha = sha;
    }

    const saveResponse = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/data/products.json`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(
          githubBody
        ),
      }
    );

    if (!saveResponse.ok) {
      const error =
        await saveResponse.text();

      console.error(
        "PRODUCT SAVE ERROR:",
        saveResponse.status,
        error
      );

      return NextResponse.json(
        {
          error:
            "Gambar berhasil diupload, tetapi data produk gagal disimpan.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}