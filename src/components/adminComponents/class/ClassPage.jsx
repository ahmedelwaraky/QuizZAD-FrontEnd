import { ClassNav } from "./ClassNav";
import { Route, Routes } from "react-router-dom";
import { AllClasses } from "./AllClasses";
import { NewClass } from "./NewClass";
import { ClassView } from "./ClassView";
import { AddMembers } from "./AddMembers";
import { ClassQuiz } from "./ClassQuiz";

export function ClassPage() {
  return (
    <div>
      <section className="QuizDash">
        <ClassNav />
        <Routes>
          <Route path="" element={<AllClasses />} />
          <Route path=":id" element={<ClassView />} />
          <Route path=":id/edit" element={<NewClass />} />
          <Route path="/:id/members" element={<AddMembers />} />
          <Route path="/:id/quizzes" element={<ClassQuiz />} />
        </Routes>
      </section>
    </div>
  );
}
