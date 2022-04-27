import React, { Fragment, useState, useRef, useEffect } from "react";
import dateFormat from "dateformat";
import ChartJS from "chart.js/auto";

import { Bar } from "react-chartjs-2";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getChartAdopted, clearErrors } from "../../actions/animalActions";

const AdoptedCharts = () => {
  //Bar Chart Data

  const [adoptedDates, setAdoptedDates] = useState([]);
  const [adoptedDataPoints, setAdoptedDataPoints] = useState([]);
  const [adoptedStart, setAdoptedStart] = useState(
    dateFormat(new Date(), "isoDate")
  );
  const [adoptedEnd, setAdoptedEnd] = useState("2022-12-31");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, adopted } = useSelector(
    (state) => state.adoptedChart
  );

  const adoptedRefStart = useRef();
  const adoptedRefEnd = useRef();

  useEffect(() => {
    dispatch(getChartAdopted());
    const initialDates = ["Arpil", "May", "June"];
    const initialDataPoints = [1, 0, 0];

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    setAdoptedDates(initialDates);
    setAdoptedDataPoints(initialDataPoints);
  }, [dispatch, alert, error]);

  const results = adopted.map((sakit) => {
    return sakit.adoption;
  });

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Adopted animal per month",
      },
    },
  };

  //this is for filtering data to be regroup into months

  const groups = results.reduce((groups, adopted_animal) => {
    const adopteddate = adopted_animal.adoptedAt;

    if (!groups[adopteddate]) {
      groups[adopteddate] = [];
    }
    groups[adopteddate].push(adopted_animal);
    return groups;
  }, {});
  //Fetching Dates from groups

  const arrGroups = Object.entries(groups);

  //Function for changing the state of start date
  function filterData1() {
    let valueStart = adoptedRefStart.current.value;
    setAdoptedStart(valueStart);
    let valueEnd = adoptedEnd;
    // let valueEnd = dateFormat(adoptedEnd, "mmmm");

    // const newgroups = arrGroups.filter(
    const newgroups = arrGroups.filter((obj) => {
      return obj >= valueStart && obj <= valueEnd;
    });

    const newData = Object.fromEntries(newgroups);

    const animalDateGroup = Object.keys(newData);
    // const animalDateGroup  = Object.entries(newData)

    const newAnimalDateGroup = animalDateGroup.reduce(
      (newAnimalDateGroup, adopted_animal) => {
        const adopteddate = dateFormat(adopted_animal, "mmmm");
        if (!newAnimalDateGroup[adopteddate]) {
          newAnimalDateGroup[adopteddate] = [];
        }
        newAnimalDateGroup[adopteddate].push(adopted_animal);

        // return dateFormat(item, "mmmm");
        return newAnimalDateGroup;
        // return item;
      },
      {}
    );

    const uniqueDates = Object.keys(newAnimalDateGroup);

    setAdoptedDates(uniqueDates);

    const newAnimalCount = Object.values(newAnimalDateGroup);
    const newAnimalCountLength = Object.values(newAnimalCount).map((animal) => {
      return animal.length;
    });

    setAdoptedDataPoints(newAnimalCountLength);
  }

  // Function for changing the state of end date
  function filterData2() {
    let valueEnd = adoptedRefEnd.current.value;
    setAdoptedEnd(valueEnd);
    // let valueStart = dateFormat(adoptedRefStart.current.value, "mmmm");
    let valueStart = adoptedStart;
    // let valueEnd = dateFormat(adoptedEnd, "mmmm");

    // const newgroups = arrGroups.filter(
    const newgroups = arrGroups.filter((obj) => {
      return obj >= valueStart && obj <= valueEnd;
    });

    const newData = Object.fromEntries(newgroups);

    const animalDateGroup = Object.keys(newData);
    // const animalDateGroup  = Object.entries(newData)

    const newAnimalDateGroup = animalDateGroup.reduce(
      (newAnimalDateGroup, adopted_animal) => {
        const adopteddate = dateFormat(adopted_animal, "mmmm");
        if (!newAnimalDateGroup[adopteddate]) {
          newAnimalDateGroup[adopteddate] = [];
        }
        newAnimalDateGroup[adopteddate].push(adopted_animal);

        // return dateFormat(item, "mmmm");
        return newAnimalDateGroup;
        // return item;
      },
      {}
    );

    const uniqueDates = Object.keys(newAnimalDateGroup);

    setAdoptedDates(uniqueDates);

    const newAnimalCount = Object.values(newAnimalDateGroup);
    const newAnimalCountLength = Object.values(newAnimalCount).map((animal) => {
      return animal.length;
    });

    setAdoptedDataPoints(newAnimalCountLength);
  }

  //Setting up datas to Bar chart
  const state = {
    labels: adoptedDates,
    datasets: [
      {
        label: "Animal",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        data: adoptedDataPoints,
      },
    ],
  };

  return (
    <Fragment>
      <MetaData title={"Dashboard"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="col-md-6">
          <h3 className="my-4">Adopted Animal</h3>
          <Bar data={state} options={options} />
          <div className="mydatepicker">
            <label>From:</label>
            <input
              type="date"
              ref={adoptedRefStart}
              value={adoptedStart}
              onChange={filterData1}
            />

            <label> {"   "}To: </label>
            <input
              type="date"
              ref={adoptedRefEnd}
              value={adoptedEnd}
              onChange={filterData2}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdoptedCharts;
