import React, { useState, useEffect } from 'react';

import * as api from './api/apiService';
import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';
//importa * tudo que tiver exportando como api

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [teste, setTeste] = useState(false);
  //[] vetor, {} objeto
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // api.getAllGrades().then((grades) => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
  }, []);
  // se não vai ficar atualizando, vai chamar só uma vez o vetor [] pode ficar null

  const handleDelete = async (gradetoDelete) => {
    const isDeleted = await api.deleteGrade(gradetoDelete);
    console.log(gradetoDelete);
    // if (isDeleted) {
    //   const deletedGradeIndex = allGrades.findIndex(
    //     (grade) => grade.id === gradetoDelete.id
    //   );
    const newGrades = Object.assign([], allGrades);
    // newGrades[deletedGradeIndex].isDeleted = true;
    // newGrades[deletedGradeIndex].value = 0;

    setAllGrades(newGrades);
    document.location.reload(true);

    // }
  };
  const handlePersist = (grade) => {
    setSelectedGrade(grade);
    setModalOpen(true);
  };
  const handlePersist2 = (grade) => {
    setSelectedGrade(grade);
    setTeste(true);
    setModalOpen(true);
  };
  const handlePersistData = async (formData) => {
    const { id, book, autor, editora, newValue } = formData;
    const newGrades = Object.assign([], allGrades);
    const gradePersist = newGrades.find((grade) => grade.id === id);
    console.log(newGrades);
    gradePersist.student = book;
    gradePersist.subject = autor;
    gradePersist.type = editora;
    gradePersist.value = newValue;

    if (teste) {
      let newId = id;
      ++newId;
      gradePersist.id = newId;
      setTeste(false);
      await api.insertGrade(gradePersist);
      document.location.reload(true);
    } else {
      await api.updateGrade(gradePersist);
    }

    setModalOpen(false);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1 className="center">Estoque de Biblioteca</h1>

      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
          onTestei={handlePersist2}
        />
      )}
      {ModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}
