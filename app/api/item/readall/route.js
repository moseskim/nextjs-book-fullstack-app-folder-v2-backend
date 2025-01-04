import { NextResponse} from "next/server"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels.js"

export async function GET() {
  try {
    await connectDB()
    const allItems = await ItemModel.find()  // 추가
    return NextResponse.json({message: "아이템 읽기 성공(전체)", allItems: allItems })
  } catch {
    return NextResponse.json({message: "아이템 읽기 실패(전체)"})
  }
}