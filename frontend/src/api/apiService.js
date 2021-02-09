import axios from 'axios';

const API_URL = 'http://localhost:3001/grade/';

async function getAllGrades() {
  //fetch para escrito, axios interpreta json, pode escrever, diferente do fetch
  const res = await axios.get(API_URL);

  const grades = res.data.grades.map((grade) => {
    const { student, subject, type, value } = grade;
    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      valueLowerCase: value.toLowerCase(),
      isDeleted: false,
    };
  });

  //set no js simula conjunto, elementos não podem repetir
  //não precisa fazer vários ifs

  let maxId = -1;
  grades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id;
    }
  });
  let nextId = maxId + 1;
  const usersCombinations = [];

  usersCombinations.forEach(({ student, subject, type, value }) => {
    const callitem = grades.find((grade) => {
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type &&
        grade.value === value
      );
    });

    if (!callitem) {
      grades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value,
        valueLowerCase: value.toLowerCase(),
        isDeleted: true,
      });
    }
  });

  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  return grades;
}

async function insertGrade(grade) {
  const response = await axios.post(API_URL, grade);
  return response.data.id;
}
async function updateGrade(grade) {
  const response = await axios.put(API_URL, grade);
  return response.data;
}
async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL}/${grade.id}`);
  return response.data;
}

// async function getValidationFromGradeType(gradeType) {
//   const gradeValidation = GRADE_VALIDATION.find(
//     (item) => item.gradeType === gradeType
//   );
//   const { minValue, maxValue } = gradeValidation;
//   return {
//     minValue,
//     maxValue,
//     // exemplo sem destructuring, maxValue: gradeValidation.maxValue,
//   };
// }

export {
  getAllGrades,
  insertGrade,
  updateGrade,
  deleteGrade,
  //getValidationFromGradeType,
};
