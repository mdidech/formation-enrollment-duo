
const PartnersLogos = () => {
  return (
    <div className="mb-8">
      <p className="text-center text-simplonGrayBody mb-4 font-body">
        En partenariat avec
      </p>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-simplonGrayBg">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=120&h=60&fit=crop"
            alt="Partenaire 1"
            className="h-12 w-24 object-contain"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-simplonGrayBg">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=120&h=60&fit=crop"
            alt="Partenaire 2"
            className="h-12 w-24 object-contain"
          />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-simplonGrayBg">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=120&h=60&fit=crop"
            alt="Partenaire 3"
            className="h-12 w-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnersLogos;
