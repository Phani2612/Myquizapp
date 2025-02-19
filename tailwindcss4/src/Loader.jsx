import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ClipLoader color="#36D7B7" size={50} />
    </div>
  );
}

export default Loader;
