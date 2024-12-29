export const PixelIcon = ({ name, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2 p-2 hover:bg-white rounded"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="flex items-center justify-center">
        <img src={`/icons/${icon}.png`} alt={name} className="w-16 h-16" />
      </div>
      <span className="text-primary_black text-md font-['Press_Start_2P']">
        {name}
      </span>
    </button>
  );
};
