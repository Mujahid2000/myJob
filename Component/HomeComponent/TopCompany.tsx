import CompanyCard from "./CompanyCard"

export default function TopCompany() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">Top Companies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <CompanyCard/>
         <CompanyCard/>
         <CompanyCard/>
        </div>
      </div>
    </div>
   
  )
}
