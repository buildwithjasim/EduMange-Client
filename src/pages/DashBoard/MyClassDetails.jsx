import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyClassDetails = () => {
  const { id } = useParams(); // class ID
  const axiosSecure = useAxiosSecure();

  const [classInfo, setClassInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    deadline: '',
    description: '',
  });

  // Fetch class info, assignments, and submissions count
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch class info (for enrollment count)
        const classRes = await axiosSecure.get(`/classes/${id}`);
        setClassInfo(classRes.data);

        // Fetch assignments for this class
        const assignmentsRes = await axiosSecure.get('/assignments', {
          params: { classId: id },
        });
        setAssignments(assignmentsRes.data);

        // Fetch total submissions count for this class
        // Assuming backend returns { count: number }
        const submissionsRes = await axiosSecure.get('/submissions/count', {
          params: { classId: id },
        });
        setTotalSubmissions(submissionsRes.data.count);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        Swal.fire('Error', 'Failed to load class details', 'error');
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  // Handle input change for new assignment form
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new assignment
  const handleAddAssignment = async e => {
    e.preventDefault();

    const { title, deadline, description } = newAssignment;

    if (!title || !deadline || !description) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }

    try {
      await axiosSecure.post('/assignments', {
        classId: id,
        title,
        deadline: new Date(deadline),
        description,
      });

      Swal.fire('Success', 'Assignment created', 'success');

      // Clear form & close modal
      setNewAssignment({ title: '', deadline: '', description: '' });
      setShowAssignmentModal(false);

      // Update assignment list & count live
      setAssignments(prev => [...prev, { title, deadline, description }]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to create assignment', 'error');
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading class details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{classInfo?.title}</h1>

      {/* Class Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Total Enrollment</h3>
          <p className="text-4xl font-bold">{classInfo?.enrolled || 0}</p>
        </div>
        <div className="card bg-base-200 p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
          <p className="text-4xl font-bold">{assignments.length}</p>
        </div>
        <div className="card bg-base-200 p-4 rounded shadow text-center">
          <h3 className="text-xl font-semibold mb-2">
            Total Assignment Submissions
          </h3>
          <p className="text-4xl font-bold">{totalSubmissions}</p>
        </div>
      </div>

      {/* Assignment Section */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Assignments</h2>
        <button
          onClick={() => setShowAssignmentModal(true)}
          className="btn btn-primary"
        >
          Create Assignment
        </button>
      </div>

      {assignments.length === 0 ? (
        <p>No assignments created yet.</p>
      ) : (
        <ul className="space-y-4">
          {assignments.map((assignment, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{assignment.title}</h3>
              <p>
                <strong>Deadline: </strong>
                {new Date(assignment.deadline).toLocaleDateString()}
              </p>
              <p>{assignment.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Assignment Creation Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Create Assignment</h3>
            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={newAssignment.deadline}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={newAssignment.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClassDetails;
