const arrQuestions_GIT = [
  {
    category: 'GIT'
  },
  {
    question: "I need to create a new 'dev' branch",
    type: "multiple choice",
    correctId: "d",
    arrChoices: [
      {
        id: "a",
        answer: "git init"
      },
      {
        id: "b",
        answer: "git checkout dev"
      },
      {
        id: "c",
        answer: "git merge dev"
      },
      {
        id: "d",
        answer: "git checkout -b dev"
      }
    ]
  },
  {
    question: "What do I do to save my project on my laptop?",
    type: "multiple choice",
    correctId: "a",
    arrChoices = [
      {
        id: "a",
        answer: "git add .\n git commit -m"
      },
      {
        id: "b",
        answer: "git init\n git save"
      },
      {
        id: "c",
        answer: "git save all"
      },
      {
        id: "d",
        answer: "git save\n git commit -m"
      },

    ]
  },
  {
    question: "How to I refresh my local repository?",
    type: "multiple choice",
    correctId: "b",
    arrChoices = [
      {
        id: "a",
        answer: "git push"
      },
      {
        id: "b",
        answer: "git checkout master\ngit pull\ngit checkout dev\ngit merge master"
      },
      {
        id: "c",
        answer: "git refresh"
      },
      {
        id: "d",
        answer: "git init"
      }]
  },
  {
    question: "How to I bring my saved changes back up to github?",
    type: "multiple choice",
    correctId: "a",
    arrChoices = [
      {
        id: "a",
        answer: "git push"
      },
      {
        id: "b",
        answer: "git pull"
      },
      {
        id: "c",
        answer: "git refresh"
      },
      {
        id: "d",
        answer: "git init"
      }]
  },
  {
    question: "I want to send my completed project to the main repository.  How do I do that?",
    type: "multiple choice",
    correctId: "d",
    arrChoices = [
      {
        id: "a",
        answer: "Email it to git."
      },
      {
        id: "b",
        answer: "Push it to the repository."
      },
      {
        id: "c",
        answer: "Do a push request."
      },
      {
        id: "d",
        answer: "Do a pull request."
      }]
  }
];


module.exports = {
  arrQuestions_GIT
}