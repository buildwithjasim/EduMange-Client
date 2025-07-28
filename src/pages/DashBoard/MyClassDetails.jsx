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

        const [classRes, assignmentsRes, submissionsRes] = await Promise.all([
          axiosSecure.get(`/classes/${id}`),
          axiosSecure.get('/assignments', { params: { classId: id } }),
          axiosSecure.get('/submissions/count', { params: { classId: id } }),
        ]);

        setClassInfo(classRes.data);
        setAssignments(assignmentsRes.data);
        setTotalSubmissions(submissionsRes.data.count);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to load class details', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  // Handle form input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle new assignment submission
  const handleAddAssignment = async e => {
    e.preventDefault();

    const { title, deadline, description } = newAssignment;

    if (!title || !deadline || !description) {
      return Swal.fire('Error', 'Please fill in all fields', 'error');
    }

    try {
      await axiosSecure.post('/assignments', {
        classId: id,
        title,
        deadline: new Date(deadline),
        description,
      });

      Swal.fire('Success', 'Assignment created', 'success');

      // Clear form
      setNewAssignment({ title: '', deadline: '', description: '' });
      setShowAssignmentModal(false);

      // Update assignment list and count
      setAssignments(prev => [...prev, { title, deadline, description }]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to create assignment', 'error');
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading class details...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {classInfo?.title}
      </h1>

      {/* Class Progress Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Total Enrollments</h3>
          <p className="text-4xl font-bold text-green-800">
            {classInfo?.enrolled || 0}
          </p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">Total Assignments</h3>
          <p className="text-4xl font-bold text-blue-800">
            {assignments.length}
          </p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold mb-2">
            Total Assignment Submissions
          </h3>
          <p className="text-4xl font-bold text-purple-800">
            {totalSubmissions}
          </p>
        </div>
      </section>

      {/* Assignment Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Class Assignments</h2>
          <button
            onClick={() => setShowAssignmentModal(true)}
            className="btn btn-accent"
          >
            Create Assignment
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments created yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((a, idx) => (
              <li key={idx} className="bg-base-200 p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p>
                  <strong>Deadline:</strong>{' '}
                  {new Date(a.deadline).toLocaleDateString()}
                </p>
                <p>{a.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal */}
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

              <div className="flex justify-end gap-3">
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
