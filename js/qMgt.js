"use strict";
const qPanel = document.getElementById("questionPanel");

// const giveDevLeagueHomage = () => {
//   const lblBlurb = document.createElement("div");
//   lblBlurb.innerHTML = "DevLeague";
//   lblBlurb.className = "overMoon";
//   qPanel.appendChild(lblBlurb);
// };

/*
  Manage the question service & response
*/
let arrQ = [];
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
    console.log(el);
    const sElementName = el.name;

    document.querySelectorAll("label").forEach(x => (x.className = "active"));
    // disable question
    // disableControl(sElementName);

    // highlight chosen radio label
    console.log(el.id);
    const chosenParm = "label[for='" + el.id + "']";
    const lblChosen = document.querySelector(chosenParm);
    lblChosen.className = "chosen";
    console.log("lblChosen", lblChosen);

    // compare obj.answer to element.innerHTML
    const obj = arrQ
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
      const arrObjNext = arrQ
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
      el.appendChild(failMsg);
    }
  };

  // Create radio buttons for one question
  const createRadioButtonControl = obj => {
    qPanel.childNodes.forEach(x =>
      x.parentNode.removeChild(x.parentNode.firstChild)
    );
    // console.log("createRadioButtonControl: ", obj);
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
    // console.log(obj.arrChoices);
    obj.arrChoices.forEach(x => {
      // add a radio button and label
      // console.log(x);
      const spanChoice = document.createElement("span");
      spanChoice.className = "choices";
      const rdo = document.createElement("input");
      rdo.type = "radio";
      rdo.name = x.id;
      rdo.value = x.id;
      rdo.id = x.id;
      console.log(rdo.id);
      rdo.addEventListener("change", evalQ);
      spanChoice.appendChild(rdo);
      const lbl = document.createElement("label");
      lbl.setAttribute("for", rdo.id);
      lbl.innerHTML = x.answer;
      // console.log(x.answer);
      // lbl.name = x.name;
      lbl.className = "active";
      // qPanel.appendChild(lbl);
      spanChoice.appendChild(lbl);
      divRadioButtons.appendChild(spanChoice);
    });

    divQuestion.appendChild(divRadioButtons);
    return divQuestion;
  };

  const loadQ = evt => {
    // const divQuestion = document.createElement("div");
    // divQuestion.id = "divQuestion";
    // load questionSet
    arrQ = [];
    // giveDevLeagueHomage();
    let houseId = evt.target.id;
    console.log("houseId: ", houseId);
    houseId = "communityCenter";
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
        arrQ = arrGeo.concat(arrGIT);
        break;
    }
    // randomize the questions and the answers
    // randomizeObjectsInArray(arrQ);
    arrQ = arrQ.filter(x => x.hasOwnProperty("question"));
    const objQ = spliceRandomObj(arrQ);
    console.log(objQ);
    const divQuestion = createRadioButtonControl(objQ);

    qPanel.appendChild(divQuestion);
  };

  return {
    loadQuestion: loadQ
  };
})();

// module.exports = {
//   serveQuestion
// }
