import { NextResponse } from "next/server";
import { gitFetcher, API, author } from "@/lib/github";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    console.log(`📝 Attempting to save name: ${name} to GitHub...`);

    // Step 1: Get current file from GitHub to get its SHA and content
    let currentFileSha: string | undefined;
    let existingData: any = { proposals: [] };

    try {
      const currentFile: any = await gitFetcher(
        "GET",
        API.file("valentine.json"),
      );
      currentFileSha = currentFile.sha;
      const content = Buffer.from(currentFile.content, "base64").toString(
        "utf-8",
      );
      existingData = JSON.parse(content);

      // Ensure proposals array exists
      if (!existingData.proposals) {
        existingData.proposals = [];
      }
    } catch (error) {
      console.log("📝 valentine.json does not exist yet, will create new file");
    }

    // Step 2: Append new entry
    const newEntry = {
      name,
      timestamp: new Date().toISOString(),
    };
    existingData.proposals.push(newEntry);

    // Step 3: Prepare the payload
    const payload = {
      message: `New Valentine Proposal Created for ${name}`,
      content: Buffer.from(JSON.stringify(existingData, null, 2)).toString(
        "base64",
      ),
      author,
      ...(currentFileSha ? { sha: currentFileSha } : {}),
    };

    // Step 4: Update/Create file on GitHub
    await gitFetcher("PUT", API.file("valentine.json"), payload);

    console.log("✅ Successfully updated valentine.json on GitHub");

    return NextResponse.json({
      success: true,
      message: "Name saved to GitHub successfully",
    });
  } catch (err: any) {
    console.error("❌ Error saving name to GitHub:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to save name",
      },
      { status: 500 },
    );
  }
}
