import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{}}>
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#8884d8"
        ariaLabel="puff-loading"
        wrapperClass="fixed top-1/2 left-1/2"
      />
    </div>
  );
};

export default Loader;
