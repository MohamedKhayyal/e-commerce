export default function ProgressBar() {
  const width = Math.random() * 40 + 60;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
      <div
        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
