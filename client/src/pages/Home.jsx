import CarForm from "../components/CarForm";
import character from "../assets/character.png"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-50 p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Title + Description + Character */}
        <div className="flex-[0.40] flex flex-col items-start text-left space-y-6">
          <h1 className="text-6xl font-extrabold text-indigo-700 text-center">
            CarLytics...
          </h1>
          <p className="text-lg text-gray-700 max-w-md text-center">
            Upload a photo of your car and get a detailed analysis along with an estimated price and reasoning.
          </p>
          <img
            src={character}
            alt="3D car character"
            className="w-1xl max-w-md object-contain"
          />
        </div>

        {/* Right Side: Form */}
        <div className="flex-[0.60] ">
          <CarForm />
        </div>

      </div>
    </div>
  );
};

export default Home;
