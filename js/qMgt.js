"use strict";
const panel = document.getElementById("questionsPanel");

/*
  Manage the question service & response
*/
const arrGeo = arrQuestions_Geography;
const arrGIT = arrQuestions_GIT;
const questionServer = (function() {
  const randomizeObjectsInArray = arr => {
    const arrNew = [];
    while (arr.length > 0) {
      const obj = spliceRandomObj(arr).pop();
      if (obj.hasOwnProperty("arrChoices")) {
        obj.arrChoices = randomizeObjectsInArray(obj.arrChoices);
      }
      arrNew.push(obj);
    }
    return arrNew;
  };

  /* remove a random object from the array */
  const spliceRandomObj = arr => {
    //get random number
    const idxRandom = getRandomIntInclusive(0, arr.length - 1);
    return arr.splice(idxRandom, 1).pop();
  };

  /* get random integer, inclusive */
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // evaluate the question
  const evalQ = event => {
    // get the name of the object
    const el = event.target;
    const sElementName = el.name;
    // disable question
    // disableControl(sElementName);

    // highlight chosen radio label
    const chosenParm = "label[for='" + el.id + "']";
    const lblChosen = document.querySelector(chosenParm);
    lblChosen.className = "chosen";
    console.log(lblChosen);

    // compare obj.answer to element.innerHTML
    const obj = arrQuestions
      .filter(x => {
        if (x.name == sElementName) {
          return true;
        }
      })
      .pop();

    //if match, add next question by: get id, loan next q by id
    if (el.value === obj.answer) {
      // go to next question
      // get order # and see if there's a higher one
      const iOrder = obj.order;
      const arrObjNext = arrQuestions
        .filter(x => {
          if (x.order > iOrder) {
            return true;
          }
        })
        .sort(sortByOrder);
    } else {
      //show failMsg
      const failMsg = document.createElement("p");

      failMsg.innerHTML = obj.failMessage || "Wrong Answer";
      failMsg.className = "failMsg";
      container.appendChild(failMsg);
    }
  };

  // Create radio buttons for one question
  const createRadioButtonControl = obj => {
    panel.childNodes.forEach(x =>
      x.parentNode.removeChild(x.parentNode.firstChild)
    );
    console.log("createRadioButtonControl: ", obj);
    const divQuestion = document.createElement("div"); // this element holds everything
    divQuestion.className = "divQuestion active";
    divQuestion.name = obj.name;
    divQuestion.id = obj.name;
    divQuestion.disabled = true;
    const pQuestionText = document.createElement("p");
    pQuestionText.id = "pQuestionText";
    pQuestionText.innerHTML = obj.question;
    divQuestion.appendChild(pQuestionText);
    // console.log(divQuestion);
    const divRadioButtons = document.createElement("div");
    divRadioButtons.id = "divRadioButtons";
    console.log(obj.arrChoices);
    obj.arrChoices.forEach(x => {
      // add a radio button and label
      console.log(x);
      const rdo = document.createElement("input");
      rdo.type = "radio";
      rdo.name = x.id;
      rdo.value = x.id;
      rdo.id = x.id + "_" + x.id;
      console.log(rdo.id);
      rdo.addEventListener("change", evalQ);
      divRadioButtons.appendChild(rdo);
      const lbl = document.createElement("label");
      lbl.setAttribute("for", lbl.id);
      lbl.innerHTML = x.answer;
      console.log(x.answer);
      // lbl.name = x.name;
      lbl.className = "active";
      panel.appendChild(lbl);

      divRadioButtons.appendChild(lbl);
    });

    divQuestion.appendChild(divRadioButtons);
    return divQuestion;
  };

  const loadQ = evt => {
    // const divQuestion = document.createElement("div");
    // divQuestion.id = "divQuestion";
    // load questionSet
    let arrQ = [];

    let houseId = evt.target.id;
    console.log("houseId: ", houseId);
    houseId = "witchHouse";
    switch (houseId) {
      case "witchHouse":
        arrQ = arrGeo;
        break;
      case "vampireHouse":
        arrQ = arrGeo;
        break;
      case "wereWolfhouse":
        arrQ = arrGeo;
        break;
      case "communityCenter":
        arrQ = arrGeo.merge(arrGit);
        break;
    }
    // randomize the questions and the answers
    // randomizeObjectsInArray(arrQ);
    arrQ = arrQ.filter(x => x.hasOwnProperty("question"));
    const objQ = spliceRandomObj(arrQ);
    console.log(objQ);
    const divQuestion = createRadioButtonControl(objQ);

    panel.appendChild(divQuestion);
  };

  return {
    loadQuestion: loadQ
  };
})();

// module.exports = {
//   serveQuestion
// }
