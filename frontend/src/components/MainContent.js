import React, { useState } from 'react';
import Login from './Login';
import { useSession } from '../session';
import InsertStudent from './InsertStudent';
import ViewStudents from './ViewStudents';
import UpdateStudent from './UpdateStudent';
import DeleteStudent from './DeleteStudent';

function MainContent() {
  const { session } = useSession();
  const [activeComponent, setActiveComponent] = useState(null);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <InsertStudent />;
      case 'view':
        return <ViewStudents />;
      case 'update':
        return <UpdateStudent />;
      case 'delete':
        return <DeleteStudent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Record Management</h1>
        <Login />
      </div>
      
      {session && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveComponent('add')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Add Student
            </button>
            <button
              onClick={() => setActiveComponent('view')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Students
            </button>
            <button
              onClick={() => setActiveComponent('update')}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            >
              Update Student
            </button>
            <button
              onClick={() => setActiveComponent('delete')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Delete Student
            </button>
          </div>

          <div className="mt-6">
            {renderActiveComponent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;