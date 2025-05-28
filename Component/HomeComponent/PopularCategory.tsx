import { Button } from "@/components/ui/button";

const categories = [
  { name: "Graphics & Design", positions: 357, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path opacity="0.2" d="M24.9996 15.0007L22.2022 7.54114C22.1406 7.37683 22.0368 7.23162 21.9013 7.12011C21.7659 7.00859 21.6034 6.9347 21.4303 6.90586L3.99957 4.00073L6.90472 21.4315C6.93357 21.6045 7.00745 21.767 7.11896 21.9025C7.23047 22.038 7.37567 22.1418 7.53997 22.2034L14.9996 25.0007L24.9996 15.0007ZM12 14.5C12 14.0056 12.1466 13.5222 12.4213 13.1111C12.696 12.7 13.0865 12.3795 13.5433 12.1903C14.0001 12.0011 14.5028 11.9516 14.9877 12.048C15.4727 12.1445 15.9181 12.3826 16.2678 12.7322C16.6174 13.0819 16.8555 13.5273 16.952 14.0123C17.0484 14.4972 16.9989 14.9999 16.8097 15.4567C16.6205 15.9135 16.3 16.304 15.8889 16.5787C15.4778 16.8534 14.9945 17 14.5 17C14.1717 17 13.8466 16.9353 13.5433 16.8097C13.24 16.6841 12.9644 16.4999 12.7322 16.2678C12.5001 16.0356 12.3159 15.76 12.1903 15.4567C12.0647 15.1534 12 14.8283 12 14.5Z" fill="#0A65CC"/>
    <path d="M12 14.5C12 15.8807 13.1193 17 14.5 17C15.8807 17 17 15.8807 17 14.5C17 13.1193 15.8807 12 14.5 12C13.1193 12 12 13.1193 12 14.5Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.99955 4.00073L12.7322 12.7322" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.99961 4.00073L6.90473 21.4314C6.93358 21.6045 7.00747 21.767 7.11898 21.9025C7.23049 22.038 7.37569 22.1418 7.54 22.2034L14.9996 25.0007L24.9996 15.0007L22.2022 7.54112C22.1406 7.37682 22.0369 7.23161 21.9014 7.1201C21.7659 7.00859 21.6034 6.9347 21.4303 6.90585L3.99961 4.00073Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.9995 25.0007L18.2924 28.2936C18.3853 28.3865 18.4955 28.4601 18.6169 28.5104C18.7382 28.5607 18.8682 28.5865 18.9995 28.5865C19.1309 28.5865 19.2609 28.5607 19.3822 28.5104C19.5035 28.4601 19.6138 28.3865 19.7066 28.2936L28.2924 19.7078C28.48 19.5203 28.5853 19.2659 28.5853 19.0007C28.5853 18.7355 28.48 18.4812 28.2924 18.2936L24.9995 15.0007" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg> },
  { name: "Code & Programming", positions: 312, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32062)">
      <path d="M8 11L2 16L8 21" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 11L30 16L24 21" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 5L12 27" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32062">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Digital Marketing", positions: 297, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32072)">
      <path opacity="0.2" d="M26.7207 5.37325C26.8698 5.32978 27.0269 5.32161 27.1796 5.34938C27.3324 5.37715 27.4765 5.4401 27.6007 5.53325C27.7249 5.6264 27.8257 5.74718 27.8952 5.88604C27.9646 6.02489 28.0007 6.17801 28.0007 6.33325V23.6666C28.0007 23.8218 27.9646 23.9749 27.8952 24.1138C27.8257 24.2526 27.7249 24.3734 27.6007 24.4666C27.4765 24.5597 27.3324 24.6227 27.1796 24.6504C27.0269 24.6782 26.8698 24.67 26.7207 24.6266L15 21.208V8.79179L26.7207 5.37325Z" fill="#0A65CC"/>
      <path d="M28.0007 6.33325V23.6666C28.0007 23.8218 27.9646 23.9749 27.8952 24.1138C27.8257 24.2526 27.7249 24.3734 27.6007 24.4666C27.4765 24.5597 27.3324 24.6227 27.1796 24.6504C27.0269 24.6782 26.8698 24.67 26.7207 24.6266L4.72073 18.2099C4.51302 18.1493 4.33056 18.023 4.20073 17.8499C4.07091 17.6768 4.00073 17.4663 4.00073 17.2499V12.7499C4.00073 12.5335 4.07091 12.323 4.20073 12.1499C4.33056 11.9768 4.51302 11.8505 4.72073 11.7899L26.7207 5.37325C26.8698 5.32978 27.0269 5.32161 27.1796 5.34938C27.3324 5.37715 27.4765 5.4401 27.6007 5.53325C27.7249 5.6264 27.8257 5.74718 27.8952 5.88604C27.9646 6.02489 28.0007 6.17801 28.0007 6.33325V6.33325Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 19.4582V24.0001C9 24.2653 9.10536 24.5197 9.29289 24.7072C9.48043 24.8948 9.73478 25.0001 10 25.0001H14C14.2652 25.0001 14.5196 24.8948 14.7071 24.7072C14.8946 24.5197 15 24.2653 15 24.0001V8.79199" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32072">
        <rect width="32" height="32" fill="white" transform="matrix(-1 0 0 1 32 0)"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Video & Animation", positions: 247, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32082)">
      <path opacity="0.2" d="M26 6H6C5.46957 6.00001 4.96086 6.21072 4.58579 6.58579C4.21072 6.96086 4.00001 7.46957 4 8V22C4.00001 22.5304 4.21072 23.0391 4.58579 23.4142C4.96086 23.7893 5.46957 24 6 24H26C26.5304 24 27.0391 23.7893 27.4142 23.4142C27.7893 23.0391 28 22.5304 28 22V8C28 7.46957 27.7893 6.96086 27.4142 6.58579C27.0391 6.21072 26.5304 6.00001 26 6ZM14 19V11L20 15L14 19Z" fill="#0A65CC"/>
      <path d="M6 24L26 24C27.1046 24 28 23.1046 28 22L28 8C28 6.89543 27.1046 6 26 6L6 6C4.89543 6 4 6.89543 4 8L4 22C4 23.1046 4.89543 24 6 24Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 28H12" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 15L14 11V19L20 15Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32082">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Music & Audio", positions: 204, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32094)">
      <path opacity="0.2" d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z" fill="#0A65CC"/>
      <path opacity="0.2" d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z" fill="#0A65CC"/>
      <path d="M22.5 25C24.433 25 26 23.433 26 21.5C26 19.567 24.433 18 22.5 18C20.567 18 19 19.567 19 21.5C19 23.433 20.567 25 22.5 25Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 29C8.433 29 10 27.433 10 25.5C10 23.567 8.433 22 6.5 22C4.567 22 3 23.567 3 25.5C3 27.433 4.567 29 6.5 29Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 10L10 14" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 25.5V8L26 4V21.5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32094">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Account & Finance", positions: 167, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32107)">
      <path opacity="0.2" d="M13 5L13 27H19V5H13Z" fill="#0A65CC"/>
      <path d="M27 27H5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 27L7 11H13" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 5L13 27H19V5H13Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 15H25V27" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32107">
        <rect width="32" height="32" fill="white" transform="matrix(0 -1 1 0 0 32)"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Health & Care", positions: 125, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32119)">
      <path opacity="0.2" d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" fill="#0A65CC"/>
      <path d="M16 14.5V21.5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.5 18H12.5" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32119">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg> },
  { name: "Data & Science", positions: 57, icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <g clipPath="url(#clip0_1647_32131)">
      <path opacity="0.2" d="M16 16C22.0751 16 27 13.3137 27 10C27 6.68629 22.0751 4 16 4C9.92487 4 5 6.68629 5 10C5 13.3137 9.92487 16 16 16Z" fill="#0A65CC"/>
      <path d="M16 16C22.0751 16 27 13.3137 27 10C27 6.68629 22.0751 4 16 4C9.92487 4 5 6.68629 5 10C5 13.3137 9.92487 16 16 16Z" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 10V16C5 19.3137 9.92487 22 16 22C22.0751 22 27 19.3137 27 16V10" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 16V22C5 25.3137 9.92487 28 16 28C22.0751 28 27 25.3137 27 22V16" stroke="#0A65CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_1647_32131">
        <rect width="32" height="32" fill="white"/>
      </clipPath>
    </defs>
  </svg>, },
];

export default function PopularCategory() {
  return (
    <section className="py-12 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold">Popular Category</h2>
        <Button variant="outline" className="text-blue-500 p-4 cursor-pointer">View All →</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-4 hover:shadow-md rounded-xl cursor-pointer flex items-center gap-4 transition-all 
            }`}
          >
            <div className={`p-3 rounded-lg `}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500">
                {category.positions} Open Position{category.positions > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
