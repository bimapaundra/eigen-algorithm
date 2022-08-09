const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const { json } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.status(200).send("eigen algorithm");
});

app.post("/string-reverse", function (req, res) {
  const word = req.body.word;
  const spaceExist = /\s/g.test(word);

  if (spaceExist) {
    return res.status(400).send("error, please input only one word");
  }

  const reversedWord =
    word
      .substring(0, word.length - 1)
      .split("")
      .reverse()
      .join("") + word.substr(word.length - 1);

  res.status(200).send(reversedWord);
});

app.post("/longest-word", function (req, res) {
  const sentence = req.body.sentence;
  const arr = sentence.split(" ");
  const spaceExist = /\s/g.test(sentence);

  if (!spaceExist) {
    return res.status(400).send("error, please input more than one word");
  }

  let lgth = 0;
  let longest;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > lgth) {
      lgth = arr[i].length;
      longest = arr[i];
    }
  }

  res.send(
    "The longest word is: " +
      "<" +
      longest +
      ">" +
      " with " +
      longest.length +
      " characters"
  );
});

app.post(
  "/repeated-words",
  body("input").exists().withMessage("input is required."),
  body("query").exists().withMessage("query is required."),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const arrInput = req.body.input.split(" ");
    const arrQuery = req.body.query.split(" ");

    const newQuery = [];

    for (let index = 0; index < arrQuery.length; index++) {
      newQuery[arrQuery[index]] = 0;
    }

    for (var key in newQuery) {
      for (let i = 0; i < arrInput.length; i++) {
        if (key === arrInput[i]) {
          newQuery[key] += 1;
        }
      }
    }

    const finalQuery = [];
    for (var key in newQuery) {
      const data = key + ":" + newQuery[key];
      finalQuery.push(data);
    }

    return res
      .status(200)
      .send("The repeated words are: " + finalQuery.join(", "));
  }
);

app.get("/matrix-reduction", function (req, res) {
  // you can custom this array as long as x & y has the same length
  const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let firstDiagonal = 0;
  let secondDiagonal = 0;
  let reverse = matrix.length - 1;
  for (let index = 0; index < matrix.length; index++) {
    if (matrix[index].length !== matrix.length) {
      return res
        .status(400)
        .send("array dimension x must be the same with dimension y");
    }
    firstDiagonal += matrix[index][index];
    secondDiagonal += matrix[index][reverse];
    reverse--;
  }

  return res
    .status(200)
    .send(
      "The sum first diagonal: " +
        firstDiagonal +
        ", sum second diagonal: " +
        secondDiagonal +
        " the result is: " +
        firstDiagonal +
        " - " +
        secondDiagonal +
        " = " +
        (firstDiagonal - secondDiagonal)
    );
});

app.listen(3030, function () {
  console.log("Server is running");
});
