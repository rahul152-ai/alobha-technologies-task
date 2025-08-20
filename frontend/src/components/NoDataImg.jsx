import noDataImg from "../assets/images/nodata.png";

const NoDataImg = () => {
  return (
    <div className="text-center mt-5 w-100">
      <img width={"37%"} src={noDataImg} alt="noData" />
    </div>
  );
};

export default NoDataImg;
