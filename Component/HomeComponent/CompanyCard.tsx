import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"

export default function CompanyCard() {
  return (
    <Card className="w-full max-w-sm py-0 bg-white border-0 shadow-md hover:shadow-sm transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="h-14 w-14 rounded-lg overflow-hidden bg-white shadow-sm border flex items-center justify-center">
              <img src="https://res.cloudinary.com/diez3alve/image/upload/v1740679929/Screenshot_2025-02-28_001041_u60rks.png" alt="" />
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
              ⭐ Top Rated
            </Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xl text-gray-900">TechCorp Solutions</h3>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">500+ employees</span>
            <span className="text-sm font-semibold text-gray-700">Technology</span>
          </div>

          <button className="w-full cursor-pointer bg-[#E7F0FA] hover:bg-[#0A65CC] text-[#0A65CC] hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
            Open Position
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
