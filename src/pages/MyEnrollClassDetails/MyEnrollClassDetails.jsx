import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [submissionLinks, setSubmissionLinks] = useState({});

  const { data: assignments = [], refetch } = useQuery({
    queryKey: ['assignments', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments?classId=${id}`);
      return res.data;
    },
  });

  const handleSubmit = async assignmentId => {
    const submissionLink = submissionLinks[assignmentId];
    if (!submissionLink) {
      return Swal.fire('Please enter a valid submission link');
    }

    try {
      await axiosSecure.post('/submissions', {
        assignmentId,
        classId: id,
        studentEmail: user.email,
        submissionLink,
        submittedAt: new Date(),
      });

      await axiosSecure.patch(`/assignments/${assignmentId}/increment`);
      Swal.fire('Submitted!', 'Your assignment has been submitted.', 'success');
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong. Try again later.', 'error');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback || rating < 1) {
      return Swal.fire('Please provide both feedback and rating');
    }

    try {
      await axiosSecure.post('/feedback', {
        classId: id,
        description: feedback,
        rating,
        studentEmail: user.email,
        createdAt: new Date(),
      });

      setFeedback('');
      setRating(0);
      setFeedbackOpen(false);
      Swal.fire('Thanks!', 'Your feedback was submitted.', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to submit feedback.', 'error');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Assignments</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base font-semibold">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a._id}>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>{new Date(a.deadline).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="input input-bordered input-sm w-48"
                      placeholder="Link"
                      value={submissionLinks[a._id] || ''}
                      onChange={e =>
                        setSubmissionLinks(prev => ({
                          ...prev,
                          [a._id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleSubmit(a._id)}
                    >
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setFeedbackOpen(true)}
          className="btn btn-secondary"
        >
          Teaching Evaluation Report (TER)
        </button>
      </div>

      {/* Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg space-y-4 w-[90%] max-w-md">
            <h3 className="text-xl font-bold text-center">
              Teaching Evaluation
            </h3>
            <textarea
              placeholder="Your feedback..."
              className="textarea textarea-bordered w-full"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            ></textarea>
            <div className="flex justify-center">
              <Rating value={rating} onChange={setRating} />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFeedbackSubmit}
                className="btn btn-success flex-1"
              >
                Send
              </button>
              <button
                onClick={() => setFeedbackOpen(false)}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
