import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css';
import config from './config.js';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    id: '',
    title: '',
    description: '',
    domain: '',
    status: '',
    guide: ''
  });
  
  const [message, setMessage] = useState('');

  const baseUrl = `${config.url}/projectapi`;

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchAllProjects = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setProjects(res.data);
    } catch (error) {
      setMessage('Failed to fetch projects.');
    }
  };

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in project) {
      if (!project[key] || project[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addProject = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, project);
      setMessage('Project added successfully.');
      fetchAllProjects();
      resetForm();
    } catch (error) {
      setMessage('Error adding project.');
    }
  };

 const deleteProject = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/delete/${id}`);
    setMessage(res.data);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    setMessage('Error deleting project.');
  }
};


  const resetForm = () => {
    setProject({
      id: '',
      title: '',
      description: '',
      domain: '',
      status: '',
      guide: ''
    });
  };

  return (
    <div className="student-container">

      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes('error') ? 'error' : 'success'
          }`}
        >
          {message}
        </div>
      )}

      <h2>Project Management</h2>

      <div>
        <h3>Add Project</h3>
        <div className="form-grid">
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={project.id}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder="Title (max 10 chars)"
            value={project.title}
            onChange={handleChange}
            maxLength={10} // matches DB column length
          />
          <input
            type="text"
            name="description"
            placeholder="Description (max 50 chars)"
            value={project.description}
            onChange={handleChange}
            maxLength={50} // matches DB column length
          />
          <input
            type="text"
            name="domain"
            placeholder="Domain"
            value={project.domain}
            onChange={handleChange}
            maxLength={255} // safe for DB
          />
          <select
            name="status"
            value={project.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="ONGOING">ONGOING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="ON-HOLD">ON-HOLD</option>
          </select>
          <input
            type="text"
            name="guide"
            placeholder="Guide (max 10 chars)"
            value={project.guide}
            onChange={handleChange}
            maxLength={10} // matches DB column length
          />
        </div>

        <div className="btn-group">
          <button className="btn-blue" onClick={addProject}>
            Add Project
          </button>
          <button className="btn-gray" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>

      <div>
        <h3>All Projects</h3>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(project).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    {Object.keys(project).map((key) => (
                      <td key={key}>{proj[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-red"
                          onClick={() => deleteProject(proj.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
