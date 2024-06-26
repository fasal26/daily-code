"use client";
import { useEffect, useState } from "react";
import { createMCQ, getAllMCQs } from "../../../apps/web/components/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./shad/ui/card";
import { Button } from "./shad/ui/button";
import { Problem, MCQQuestion } from "@prisma/client";
import AdminAddMCQ from "./AdminAddMCQ";

interface AdminAddMCQProps extends Problem {
  mcqQuestions: MCQQuestion[];
}

const AdminMCQ = () => {
  const [mcq, setMcq] = useState<MCQQuestion>();
  const [Problems, setProblems] = useState<AdminAddMCQProps[]>([]);
  useEffect(() => {
    async function fetchMCQs() {
      const Problems = await getAllMCQs();
      setProblems(Problems);
    }
    fetchMCQs();
  }, []);
  function handleAddMCQ(data: any) {
    createMCQ(data);
  }
  return (
    <div className="flex justify-center">
      <div className="w-2/3">
        {Problems.map((problem) => (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{problem.id}</CardTitle>
                  <CardTitle>{problem.title}</CardTitle>
                </div>
                <div className="flex gap-4 items-center">
                  <AdminAddMCQ problem={problem} />
                </div>
              </div>
              <CardDescription>{problem.description}</CardDescription>
              <CardDescription>{problem.type}</CardDescription>
            </CardHeader>
            <CardContent>{problem.notionDocId}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminMCQ;
