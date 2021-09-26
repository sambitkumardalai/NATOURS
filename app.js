const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

port = 3000;

app.listen(port, () => {
  console.log(`Server listening on ${port} 😎`);
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// create new tour
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// get all the tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
// get single tour
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => id === el.id);
  if (!tour) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(400).json({
    message: 'success',
    data: {
      tour,
    },
  });
};
// update tour
const updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'succcess',
      daa: {
        tour: 'updated',
      },
    });
  }
};
// delete tour
const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  }
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tour/:id').get(getTour).patch(updateTour).delete(deleteTour);
