import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    AEMET_API_KEY: process.env.AEMET_API_KEY || "AEMET_API_KEY No definida",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "COHERE_API_KEY No definida",
    DEPLOYMENT_URL: process.env.DEPLOYMENT_URL || "DEPLOYMENT_URL No definida",
  });
}
