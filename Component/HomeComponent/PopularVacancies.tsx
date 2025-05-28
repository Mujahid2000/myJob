export default function PopularVacancies() {
    const vacancies = [
      { title: "Anesthesiologists", positions: 45904 },
      { title: "Surgeons", positions: 50364 },
      { title: "Obstetricians-Gynecologists", positions: 4339 },
      { title: "Orthodontists", positions: 20079 },
      { title: "Maxillofacial Surgeons", positions: 74875 },
      { title: "Software Developer", positions: 43359 },
      { title: "Psychiatrists", positions: 18599 },
      { title: "Data Scientist", positions: 28200, link: true },
      { title: "Financial Manager", positions: 61391 },
      { title: "Management Analysis", positions: 93046 },
      { title: "IT Manager", positions: 50963 },
      { title: "Operations Research Analysis", positions: 16627 },
    ];
  
    return (
      <section className="py-12 px-3 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-left mb-8">Most Popular Vacancies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-11 max-w-7xl mx-auto">
          {vacancies.map((vacancy, index) => (
            <div key={index} className="text-left">
              <h3 className="text-lg cursor-pointer font-medium hover:underline hover:text-blue-500">
                
                    {vacancy.title}
                
              
              </h3>
              <p className="text-gray-500">{vacancy.positions.toLocaleString()} Open Positions</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  