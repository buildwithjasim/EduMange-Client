import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyClassDetails = () => {
  const { id } = useParams();
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

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
      setNewAssignment({ title: '', deadline: '', description: '' });
      setShowAssignmentModal(false);
      setAssignments(prev => [...prev, { title, deadline, description }]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to create assignment', 'error');
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold text-text/70">
        Loading class details...
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        {classInfo?.title}
      </h1>

      {/* Class Progress Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-primary/10 p-6 rounded-2xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-primary">
            Total Enrollments
          </h3>
          <p className="text-4xl font-bold text-primary">
            {classInfo?.enrolled || 0}
          </p>
        </div>
        <div className="bg-accent/10 p-6 rounded-2xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-accent">
            Total Assignments
          </h3>
          <p className="text-4xl font-bold text-accent">{assignments.length}</p>
        </div>
        <div className="bg-secondary/10 p-6 rounded-2xl shadow text-center">
          <h3 className="text-xl font-semibold mb-2 text-secondary">
            Total Assignment Submissions
          </h3>
          <p className="text-4xl font-bold text-secondary">
            {totalSubmissions}
          </p>
        </div>
      </section>

      {/* Assignment Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-primary">
            Class Assignments
          </h2>
          <button
            onClick={() => setShowAssignmentModal(true)}
            className="btn btn-accent text-white"
          >
            Create Assignment
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-text/70">No assignments created yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((a, idx) => (
              <li
                key={idx}
                className="bg-background dark:bg-gray-900 p-4 rounded-2xl shadow"
              >
                <h3 className="text-lg font-semibold text-primary">
                  {a.title}
                </h3>
                <p className="text-text/80">
                  <strong>Deadline:</strong>{' '}
                  {new Date(a.deadline).toLocaleDateString()}
                </p>
                <p className="text-text/70">{a.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background dark:bg-gray-900 rounded-2xl p-6 w-11/12 max-w-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Create Assignment
            </h3>
            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-text/80">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full border-primary focus:border-accent focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-text/80">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={newAssignment.deadline}
                  onChange={handleInputChange}
                  className="input input-bordered w-full border-primary focus:border-accent focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-text/80">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newAssignment.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full border-primary focus:border-accent focus:ring-accent"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline border-accent text-accent hover:bg-accent/10"
                  onClick={() => setShowAssignmentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white">
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
