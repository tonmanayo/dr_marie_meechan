import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    revalidateTag("letter", "max");
    return NextResponse.json({ revalidated: true, type: body?._type });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
