import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`/student?page=${page}&limit=${limit}`);
      const { data, totalPages } = response.data;
      setStudents(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    fetchData(selected + 1);
  };

  return (
    <div>
      <h1>Students</h1>
      <table border="1" className="students-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.fullName}</td>
              <td>{student.email}</td>
              <td>{student.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default App;
