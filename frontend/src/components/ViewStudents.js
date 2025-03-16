import React, { useState, useEffect } from 'react';
import { JsonRpc } from 'eosjs';
import { ENDPOINT, CONTRACT_NAME } from '../config';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const rpc = new JsonRpc(ENDPOINT);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const result = await rpc.get_table_rows({
        json: true,
        code: CONTRACT_NAME,
        scope: CONTRACT_NAME,
        table: 'students',
        limit: 100,
      });
      setStudents(result.rows || []);
    } catch (err) {
      console.error('Failed to fetch students:', err);
      setError('Failed to fetch students');
    }
  };

  return (
    <div className="mt-8">
      {error && <div className="text-red-500">{error}</div>}
      <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Key</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Surname</th>
              <th className="py-2 px-4 border-b">Fiscal Code</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">City</th>
              <th className="py-2 px-4 border-b">Course</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.key}>
                  <td className="py-2 px-4 border-b">{student.key}</td>
                  <td className="py-2 px-4 border-b">{student.user}</td>
                  <td className="py-2 px-4 border-b">{student.nome}</td>
                  <td className="py-2 px-4 border-b">{student.cognome}</td>
                  <td className="py-2 px-4 border-b">{student.codice_fiscale}</td>
                  <td className="py-2 px-4 border-b">{student.via}</td>
                  <td className="py-2 px-4 border-b">{student.citta}</td>
                  <td className="py-2 px-4 border-b">{student.nome_corso}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-2 px-4 border-b text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStudents;