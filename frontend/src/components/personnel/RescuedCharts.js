import React, { Fragment, useState, useRef, useEffect } from "react";
import dateFormat from "dateformat";
import { Bar } from "react-chartjs-2";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getChartRescued, clearErrors } from "../../actions/animalActions";

const Charts = () => {
  //Bar Chart Data

  const [rescueDates, setRescueDates] = useState([]);
  const [rescueDataPoints, setRescueDataPoints] = useState([]);
  const [rescuedStart, setRescuedStart] = useState(
    dateFormat(new Date(), "isoDate")
  );
  const [rescuedEnd, setRescuedEnd] = useState("2022-12-31");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, animals } = useSelector(
    (state) => state.animalCharts
  );

  const rescuedRefStart = useRef();
  const rescuedRefEnd = useRef();

  useEffect(() => {
    dispatch(getChartRescued());
    const initialDates = ["Arpil", "May", "June"];
    const initialDataPoints = [1, 3, 4];
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    setRescueDates(initialDates);
    setRescueDataPoints(initialDataPoints);
  }, [dispatch, alert, error]);

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
        text: "Rescued animal per month",
      },
    },
  };

  //this is for filtering data to be regroup into months
  const groups = animals.reduce((groups, rescued_animal) => {
    const rescueddate = rescued_animal.createdAt;
    if (!groups[rescueddate]) {
      groups[rescueddate] = [];
    }
    groups[rescueddate].push(rescued_animal);
    return groups;
  }, {});

  const arrGroups = Object.entries(groups);

  //Function for changing the state of start date
  function filterData1() {
    let valueStart = rescuedRefStart.current.value;
    setRescuedStart(valueStart);
    let valueEnd = rescuedEnd;
    // let valueEnd = dateFormat(rescuedEnd, "mmmm");
    console.log(valueStart);
    console.log(valueEnd);

    console.log(arrGroups);
    // const newgroups = arrGroups.filter(
    const newgroups = arrGroups.filter((obj) => {
      return obj >= valueStart && obj <= valueEnd;
    });
    console.log(newgroups);

    const newData = Object.fromEntries(newgroups);
    console.log(newData);

    const animalDateGroup = Object.keys(newData);
    // const animalDateGroup  = Object.entries(newData)
    console.log(animalDateGroup);

    const newAnimalDateGroup = animalDateGroup.reduce(
      (newAnimalDateGroup, rescued_animal) => {
        const rescueddate = dateFormat(rescued_animal, "mmmm");
        if (!newAnimalDateGroup[rescueddate]) {
          newAnimalDateGroup[rescueddate] = [];
        }
        newAnimalDateGroup[rescueddate].push(rescued_animal);

        // return dateFormat(item, "mmmm");
        return newAnimalDateGroup;
        // return item;
      },
      {}
    );

    console.log(newAnimalDateGroup);

    const uniqueDates = Object.keys(newAnimalDateGroup);
    console.log(uniqueDates);
    setRescueDates(uniqueDates);

    const newAnimalCount = Object.values(newAnimalDateGroup);
    const newAnimalCountLength = Object.values(newAnimalCount).map((animal) => {
      return animal.length;
    });
    console.log(newAnimalCountLength);
    setRescueDataPoints(newAnimalCountLength);
  }

  // Function for changing the state of end date
  function filterData2() {
    let valueEnd = rescuedRefEnd.current.value;
    setRescuedEnd(valueEnd);
    // let valueStart = dateFormat(rescuedRefStart.current.value, "mmmm");
    let valueStart = rescuedStart;
    // let valueEnd = dateFormat(rescuedEnd, "mmmm");
    console.log(valueStart);
    console.log(valueEnd);

    console.log(arrGroups);
    // const newgroups = arrGroups.filter(
    const newgroups = arrGroups.filter((obj) => {
      return obj >= valueStart && obj <= valueEnd;
    });
    console.log(newgroups);

    const newData = Object.fromEntries(newgroups);
    console.log(newData);

    const animalDateGroup = Object.keys(newData);
    // const animalDateGroup  = Object.entries(newData)
    console.log(animalDateGroup);

    const newAnimalDateGroup = animalDateGroup.reduce(
      (newAnimalDateGroup, rescued_animal) => {
        const rescueddate = dateFormat(rescued_animal, "mmmm");
        if (!newAnimalDateGroup[rescueddate]) {
          newAnimalDateGroup[rescueddate] = [];
        }
        newAnimalDateGroup[rescueddate].push(rescued_animal);

        // return dateFormat(item, "mmmm");
        return newAnimalDateGroup;
        // return item;
      },
      {}
    );

    console.log(newAnimalDateGroup);

    const uniqueDates = Object.keys(newAnimalDateGroup);
    console.log(uniqueDates);
    setRescueDates(uniqueDates);

    const newAnimalCount = Object.values(newAnimalDateGroup);
    const newAnimalCountLength = Object.values(newAnimalCount).map((animal) => {
      return animal.length;
    });
    console.log(newAnimalCountLength);
    setRescueDataPoints(newAnimalCountLength);
  }

  //Setting up datas to Bar chart
  const state = {
    labels: rescueDates,
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
        data: rescueDataPoints,
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
          <h3 className="my-4">Rescued Animal</h3>
          <Bar data={state} options={options} />
          <div className="mydatepicker">
            <label>From:</label>
            <input
              type="date"
              ref={rescuedRefStart}
              value={rescuedStart}
              onChange={filterData1}
            />

            <label> {"   "}To: </label>
            <input
              type="date"
              ref={rescuedRefEnd}
              value={rescuedEnd}
              onChange={filterData2}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Charts;
