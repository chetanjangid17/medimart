import { useNavigate } from "react-router";

// category 
const category = [
    {
        image: 'https://pnghq.com/wp-content/uploads/cough-syrup-png-free-image-png-58669.png',
        name: 'syrup'
    },
    {
        image: 'https://png.pngtree.com/png-clipart/20220909/original/pngtree-luxury-beauty-hair-salon-spa-logo-design-png-image_8523173.png',
        name: 'beauty'
    },
    {
        image: 'https://cdn-icons-png.flaticon.com/512/13163/13163611.png',
        name: 'Surgicals'
    },
    {
        image: 'https://www.pngrepo.com/download/109551/pill.png',
        name: 'Tablets'
    },
    {
        image: 'https://cdn1.iconfinder.com/data/icons/healthcare-106/100/health_clinic_medical_healthcare-07-512.png',
        name: 'Devices'
    },
    {
        image: "https://cdn-icons-png.flaticon.com/512/3166/3166963.png",
        name: 'Antiseptic'
    },
    
    {
        image:"https://cdn.shopify.com/s/files/1/0599/1425/6556/files/rented_4.png?v=1693607521",
        name: 'Fitness'
    },
   
]

const Category = () => {
    // naviaget 
    const navigate = useNavigate();
    return (
        <div className="   pb-5 bg-gradient-to-l to-pink-200 from-[#3B4A61] ">
            {/* main container */}
            <div className="grid grid-cols-4 md:flex lg:flex-row justify-center items-center gap-4 overflow-x-auto hide-scroll-bar">
                {/* category container */}
                {category.map((element, index) => (
                    <div key={index} className=" mt-4 flex flex-col items-center px-3 lg:px-10 mb-5 lg:mb-0">
                        {/* Image */}
                        <div onClick={() => navigate(`/category/${element.name}`)} className="w-16 h-16 lg:w-24 lg:h-24 max-w-xs rounded-full bg-[#A6B7CB] transition-all hover:bg-[#A4BEF9] cursor-pointer mb-1">
                            <div className="flex justify-center">
                                {/* Image tag */}
                                <img src={element.image} alt="img" />
                            </div>
                        </div>
                        {/* Name Text */}
                        <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase">{element.name}</h1>
                    </div>
                ))}
            </div>

            {/* Style for hiding scrollbar */}
            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
        </div>
    );
}

export default Category;